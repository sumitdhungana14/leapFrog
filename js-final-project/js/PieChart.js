class PieChart {

    constructor(width, height, dataPoints) {

        this.center;
        this.radius;

        this.offSetX = 20;
        this.offSetY = 30;

        this.total;
        this.animationID;

        this.pieElements = [];
        this._dataPoints = dataPoints;
        this.initialPieDraw = [];

        this.sliceAngles = [];
        this.currentAngle = [];

        this.colors = ['#EE82EE', '#FA8072', '#DB7093', '#FFC107', '#87CEFA', '#FFC0CB', '#266A73', '#992AA0', '#965E08'];

        this.currentSliceIndex;

        this.initCanvas(width, height);

        this.getRadius();
        this.getCenter();

        this.getTotal();
        this.convertToAngle();

        this.setCurrentAngleForAnimation();
        this.setSliceAngle();
        this.initiateWithAnimation();
        // this.draw();

        this.drawLabels();

        this.clickOnPieSlice();

        this.leavePieSlice();

        this.randomButton();
        this.render();

    }

    initCanvas(width, height) {
        this._canvas = document.createElement('canvas');
        this._context = this._canvas.getContext('2d');
        this._canvas.width = width;
        this._canvas.height = height;
    }

    getCanvasElement() {
        return this._canvas;
    }

    getRadius() {
        this.radius = ((3 / 5) * this._canvas.width) / 2 - this.offSetX / 2;
    }

    getCenter() {

        this.center = {
            x: (this._canvas.width) / 2 - (1 / 5) * this._canvas.width,
            y: (this.radius + 0.5 * this.offSetY),

        }
    }

    getTotal() {

        this.total = this._dataPoints.reduce((total, val) => {

            for (let key in val) {
                var value = val[key];
            }

            return total + value;

        }, 0);
    }

    convertToAngle() {

        this.pieElements = this._dataPoints.map((dataPoint) => {

            for (let key in dataPoint) {
                return dataPoint[key] / this.total;
            }

        });
    }


    setCurrentAngleForAnimation() {

        var begin = 0;
        var end = 0;
        this.pieElements.forEach((angle, index) => {
            if (this.currentAngle.length <= this._dataPoints.length) {
                begin = end;
                end = end + 2 * (Math.PI * this.pieElements[index]);
                this.currentAngle.push(begin);
            }

        });

    }

    setSliceAngle() {

        var begin = 0;
        var end = 0;
        for (let i = 0; i < this.pieElements.length; i++) {
            begin = end;
            end = end + 2 * (Math.PI * this.pieElements[i]);
            if (this.sliceAngles.length < this._dataPoints.length) {
                this.sliceAngles.push({
                    begin: begin / 2,
                    end: end / 2
                });
            }
        }
    }


    draw() {
        var begin = 0;
        var end = 0;

        this.setSliceAngle();
        for (let i = 0; i < this.pieElements.length; i++) {
            begin = end;
            end = end + 2 * (Math.PI * this.pieElements[i]);

            this._context.beginPath();
            this._context.fillStyle = this.colors[i % this.colors.length];

            this._context.moveTo(this.center.x, this.center.y);


            this._context.arc(this.center.x, this.center.y, this.radius, begin, end);


            this._context.lineTo(this.center.x, this.center.y);
            this._context.stroke();

            this._context.fill();
        }

    }

    initiateWithAnimation() {

        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        // console.log(this.sliceAngles);
        var begin = 0;
        var end = 0;
        for (let i = 0; i < this.pieElements.length; i++) {
            begin = end;
            end = end + 2 * (Math.PI * this.pieElements[i]);
            this.initialPieDraw[i] = false;
            this._context.beginPath();
            this._context.fillStyle = this.colors[i % this.colors.length];

            this._context.moveTo(this.center.x, this.center.y);

            if (this.currentAngle[i] <= end) {
                this._context.arc(this.center.x, this.center.y, this.radius, begin, this.currentAngle[i]);
                this.currentAngle[i] += 0.010;
            } else {
                this._context.arc(this.center.x, this.center.y, this.radius, begin, end);
                this.initialPieDraw[i] = true;
            }

            this._context.lineTo(this.center.x, this.center.y);
            this._context.stroke();

            this._context.fill();
        }


        this.drawLabels();
        this.randomButton();

        this.animationID = window.requestAnimationFrame(this.initiateWithAnimation.bind(this));

        if (this.isInitialDrawingCompleted()) {
            window.cancelAnimationFrame(this.animationID);
        }
    }

    drawLabels() {

        this._dataPoints.forEach((dataPoint, index) => {
            this._context.beginPath();
            this._context.fillStyle = this.colors[index % this.colors.length];
            this._context.rect(this._canvas.width - (1 / 3) * (this._canvas.width), 20 + index * 40, 20, 20);
            this._context.stroke();
            this._context.fill();
            this._context.font = '20px Arial';
            for (let key in this._dataPoints[index]) {
                this._context.fillText([key], this._canvas.width - (1 / 3) * (this._canvas.width) + 40, 35 + index * 40);
            }
        })

    }

    getMousePosition(event) {
        var rect = this.getCanvasElement().getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    performHighlightAction(a) {
        var angle;
        var currentSliceIndex;
        if (a > 0) {
            angle = Math.abs(a) * (180 / Math.PI);
        } else {
            angle = 180 + (180 - Math.abs(a) * (180 / Math.PI));

        }
        this.sliceAngles.forEach((sliceAngle, index) => {
            if (angle >= (sliceAngle.begin) * (360 / Math.PI) && angle <= (sliceAngle.end) * (360 / Math.PI)) {
                currentSliceIndex = index;
                this.highlightSliceOnClick(sliceAngle.begin, sliceAngle.end, currentSliceIndex);
            }
        });
    }

    clickOnPieSlice() {
        this._canvas.addEventListener('click', event => {

            var mousePosition = this.getMousePosition(event);

            var r = Math.sqrt(Math.pow((mousePosition.x - this.center.x), 2) + Math.pow((mousePosition.y - this.center.y), 2));
            var a = Math.atan2(mousePosition.y - this.center.y, mousePosition.x - this.center.x);

            if (r < this.radius) {
                this.performHighlightAction(a);
            } else if (this.mouseOnRandomButton(mousePosition)) {
                this.generateRandomDataPoints();
            } else {
                return;
            }
        })
    }

    highlightSliceOnClick(begin, end, currentSliceIndex) {

        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this.draw();

        this._context.beginPath();
        this._context.fillStyle = this.colors[currentSliceIndex % this.colors.length];

        this._context.moveTo(this.center.x, this.center.y);
        this._context.arc(this.center.x, this.center.y, this.radius + 10, 2 * begin - (6.28 / 180), 2 * end + (6.28 / 180));
        this._context.lineTo(this.center.x, this.center.y);
        this._context.stroke();

        this._context.fill();

        this.showCurrentSliceInfo(currentSliceIndex);

        this.drawLabels();

        this.randomButton();
    }

    showCurrentSliceInfo(currentSliceIndex) {
        var value;
        var currentKey;
        this._context.beginPath();
        this._context.fillStyle = this.colors[currentSliceIndex % this.colors.length];
        this._context.rect(0, this.center.y + this.radius + 40, 20, 20);
        this._context.stroke();
        this._context.fill();
        for (let key in this._dataPoints[currentSliceIndex]) {
            value = this._dataPoints[currentSliceIndex][key];
            currentKey = key;
        }
        this._context.fillText(currentKey + ' : ' + value,
            35,
            this.center.y + this.radius + 55);
    }

    leavePieSlice() {

        this._canvas.onmouseleave = event => {
            if (this.isInitialDrawingCompleted()) {

                this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
                window.cancelAnimationFrame(this.animationID);
                this.draw();

                this.drawLabels();

                this.randomButton();
            }
        };
    }

    randomButton() {

        this._context.beginPath();
        this._context.fillStyle = 'black';
        this._context.rect(this._canvas.width / 2 - 100, this.center.y + this.radius + 80, 200, 50);
        this._context.stroke();
        this._context.fill();
        this._context.font = '25px Comic Sans MS';
        this._context.fillStyle = 'white';
        this._context.fillText('Randomize', this._canvas.width / 2 - 62, this.center.y + this.radius + 115);
    }

    mouseOnRandomButton(mousePosition) {
        return mousePosition.x > this._canvas.width / 2 - 100 &&
            mousePosition.x < this._canvas.width / 2 - 100 + 200 &&
            mousePosition.y < this.center.y + this.radius + 80 + 50 &&
            mousePosition.y > this.center.y + this.radius + 80;
    }

    generateRandomDataPoints() {
        // window.cancelAnimationFrame(this.animationID);
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this.sliceAngles = [];
        this._dataPoints = [];
        this.pieElements = [];

        for (let i = 0; i <= Math.ceil(Math.random() * 6); i++) {
            this._dataPoints.push({ 'x': Math.ceil(Math.random() * 100) });
        }

        this.getTotal();
        this.convertToAngle();

        this.draw();

        this.drawLabels();

        this.randomButton();

    }

    isInitialDrawingCompleted() {

        return this.initialPieDraw.reduce((isCompleted, val) => {
            return isCompleted && val;
        }, true);
    }

    render() {

        var canvas = this.getCanvasElement();
        document.body.appendChild(canvas);
    }

}