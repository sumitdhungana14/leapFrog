class ScatterPlot {
    constructor(width, height, dataSource) {

        this.xPoints = [];
        this.yPoints = [];

        this.positionOnCanvas = [];

        this.Xmax;
        this.Ymax;

        this.Xmin;
        this.Ymin;

        this.scaleX;
        this.scaleY;

        this.offsetX = 100;
        this.offsetY = 100;

        this._color = ['red', 'blue', 'green', 'purple', 'black', 'yellow', 'pink'];

        this.initCanvas(width, height);
        this.setDataSource(dataSource);

        this.getPoints();
        this.setScale();
        this.drawAxes();
        this.drawAxisLabels();

        this.draw(dataSource);

        this.showInfoOnHover();
        this.randomButton();

        this.checkClickOnRandomize();

        this.render();
        this.generateInputRange();
        this.generateButton();
        this.showRange();

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

    getColor() {
        return this._color[Math.floor(Math.random() * 7)];
    }

    setDataSource(dataSource) {
        this._dataSource = dataSource;
        this._cloneDataSource = dataSource;
    }


    getMousePosition(event) {
        var rect = this.getCanvasElement().getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    getPoints() {
        this.xPoints = [];
        this.yPoints = [];
        this._dataSource.forEach(dataPoint => {
            this.xPoints.push(dataPoint.x);
            this.yPoints.push(dataPoint.y);
        });


        this.Xmax = Math.max(...this.xPoints);
        this.Ymax = Math.max(...this.yPoints);

        this.Xmin = Math.min(...this.xPoints);
        this.Ymin = Math.min(...this.yPoints);

    }

    setScale() {
        this.scaleX = (this._canvas.width - this.offsetX) / (this.Xmax);
        this.scaleY = (this._canvas.height - this.offsetY) / (this.Ymax);
    }

    drawAxes() {
        this._context.beginPath();
        this._context.moveTo(this.offsetX / 2, this._canvas.height - this.offsetY / 2);
        this._context.lineTo(this._canvas.width - this.offsetX / 2, this._canvas.height - this.offsetY / 2);
        this._context.moveTo(this.offsetX / 2, this._canvas.height - this.offsetY / 2);
        this._context.lineTo(this.offsetX / 2, this.offsetY / 2);
        this._context.stroke();

    }

    drawAxisLabels() {
        const length = 5;
        const startY = this._canvas.height - (this.offsetY / 2);
        const startX = (this.offsetX / 2);

        const stepY = (this._canvas.height - this.offsetY) / 9;
        const stepX = (this._canvas.width - this.offsetX) / 9;

        for (let i = 0; i < 10; i++) {
            let scaleStep = stepY / this.scaleY;
            this._context.moveTo((this.offsetX / 2) - length, startY - i * stepY);
            this._context.lineTo(this.offsetX / 2, startY - i * stepY);
            this._context.stroke();
            this._context.fillStyle = 'black';
            this._context.font = '12px Arial';
            this._context.fillText(Math.ceil(i * scaleStep), (this.offsetX / 2) - 30, startY - i * stepY + 5)
        }

        for (let i = 0; i < 10; i++) {
            let scaleStep = (stepX / this.scaleX);
            this._context.moveTo(startX + i * stepX, startY);
            this._context.lineTo(startX + i * stepX, startY + length);
            this._context.stroke();
            this._context.fillText(Math.ceil(i * scaleStep), startX + i * stepX - 8, startY + 20)
        }

    }

    draw(dataPoints) {
        dataPoints.forEach(point => {
            this.drawPoint(point.x, point.y);
        });
    }

    drawPoint(xCord, yCord) {
        var pointOnCanvasX = (this.offsetX / 2) + (xCord * this.scaleX);
        var pointOnCanvasY = this._canvas.height - (this.offsetY / 2) - (yCord) * this.scaleY;

        if (this.positionOnCanvas.length < this._dataSource.length) {
            this.positionOnCanvas.push({ 'x': pointOnCanvasX, 'y': pointOnCanvasY });
        }

        this._context.beginPath();
        this._context.moveTo(80, 80);
        this._context.arc(pointOnCanvasX, pointOnCanvasY, 2, 0, 2 * Math.PI);
        this._context.fill();
    }


    mouseIsOnPoint(position, mousePosition) {
        return mousePosition.x > position.x && mousePosition.x < position.x + 4 && mousePosition.y < position.y + 4 && mousePosition.y > position.y;
    }

    showInfoOnHover() {
        this._canvas.onmousemove = event => {
            var mousePosition = this.getMousePosition(event);

            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

            this.drawAxes();
            this.drawAxisLabels();
            this.draw(this._dataSource);
            this.randomButton();

            this.positionOnCanvas.forEach((position, index) => {
                if (this.mouseIsOnPoint(position, mousePosition)) {
                    this.showCord(position, mousePosition, index);
                }
            })
        }

    }

    showCord(position, mousePosition, index) {
        this._context.beginPath();
        this._context.fillStyle = 'grey';
        this._context.rect(position.x + 8, position.y + 8, 80, 50);
        this._context.stroke();
        this._context.fill();
        this._context.font = '15px Arial';
        this._context.fillStyle = 'white';

        this._context.fillText('x: ' + this._dataSource[index].x, position.x + 20, position.y + 30);
        this._context.fillText('y: ' + this._dataSource[index].y, position.x + 20, position.y + 50);
    }

    randomButton() {

        this._context.beginPath();
        this._context.rect((this._canvas.width / 2) - 50, this._canvas.height - 20, 100, 20);
        this._context.stroke();
        this._context.fillText('Randomize', (this._canvas.width / 2) - 30, this._canvas.height - 8);

    }

    checkClickOnRandomize() {
        this._canvas.addEventListener('click', event => {
            var mousePosition = this.getMousePosition(event);

            if (this.mouseIsInsideRandomButton(mousePosition)) {
                this.generateRandomPoints();
            }
        })
    }

    mouseIsInsideRandomButton(mousePosition) {
        return mousePosition.x > (this._canvas.width / 2) - 50 && mousePosition.x < (this._canvas.width / 2) - 50 + 100 && mousePosition.y < this._canvas.height - 20 + 20 && mousePosition.y > this._canvas.height - 20;
    }

    generateRandomPoints() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this._dataSource = [];
        this._cloneDataSource = [];

        for (let i = 0; i < 100; i++) {
            var x = Math.ceil(Math.random() * 1000);
            var y = Math.ceil(Math.random() * 1000);
            this._dataSource.push({ 'x': x, 'y': y });
            this._cloneDataSource.push({ 'x': x, 'y': y });
        }

        this.getPoints();
        this.setScale();
        this.drawAxes();
        this.drawAxisLabels();
        this.showRange();
        this.generateInputRange();
        this.positionOnCanvas = [];
        this.draw(this._dataSource);
        this.randomButton();
    }

    generateInputRange() {
        var container = document.getElementById('container');

        var lowRange = document.getElementById('low-input-range');
        var highRange = document.getElementById('high-input-range');

        if (lowRange && highRange) {
            lowRange.setAttribute('min', Math.min(...this.xPoints));
            lowRange.setAttribute('max', this.Xmax);
            highRange.setAttribute('min', Math.min(...this.xPoints));
            highRange.setAttribute('max', this.Xmax);

        } else {
            var lowRange = document.createElement('INPUT');
            lowRange.setAttribute('id', 'low-input-range');
            lowRange.setAttribute('type', 'range');

            lowRange.style.position = 'absolute';
            lowRange.style.left = this.offsetX / 2 + 'px';
            lowRange.setAttribute('min', Math.min(...this.xPoints));
            lowRange.setAttribute('max', Math.max(...this.yPoints));

            var highRange = document.createElement('INPUT');
            highRange.setAttribute('id', 'high-input-range');
            highRange.setAttribute('type', 'range');

            highRange.style.position = 'absolute';
            highRange.style.left = (this._canvas.width / 2) - 60 + 'px';
            highRange.setAttribute('min', Math.min(...this.xPoints));
            highRange.setAttribute('max', Math.max(...this.yPoints));

            lowRange.addEventListener('input', event => {
                this.lowRangeValue = lowRange.value;
                this.showRange()
            }, false);
            highRange.addEventListener('input', event => {
                this.highRangeValue = highRange.value;
                this.showRange()
            }, false);

            container.appendChild(lowRange);
            container.appendChild(highRange);
        }
    }

    generateButton() {

        var container = document.getElementById('container');

        var zoomButton = document.createElement('button');
        zoomButton.style.position = 'absolute';

        zoomButton.style.left = this._canvas.width - 170 + 'px';
        zoomButton.style.height = '20px';
        zoomButton.style.width = '60px';
        zoomButton.innerHTML = 'Zoom';

        zoomButton.addEventListener('click', event => {
            this.zoomGraph()
        })

        var resetButton = document.createElement('button');
        resetButton.style.position = 'absolute';

        resetButton.style.left = this._canvas.width - 90 + 'px';
        resetButton.style.height = '20px';
        resetButton.style.width = '60px';
        resetButton.innerHTML = 'Reset';

        resetButton.addEventListener('click', event => {
            this.resetGraph()
        })

        container.appendChild(zoomButton);
        container.appendChild(resetButton);
    }

    zoomGraph() {

        if (!(this.lowRangeValue && this.highRangeValue)) return;
        if (parseInt(this.lowRangeValue) >= parseInt(this.highRangeValue)) {
            return;
        };

        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this._dataSource = this._dataSource.filter(dataPoint => {
            return this.lowRangeValue <= dataPoint.x && this.highRangeValue >= dataPoint.x;
        })

        this.getPoints();
        this.setScale();
        this.drawAxes();
        this.drawAxisLabels();
        this.positionOnCanvas = [];

        this.draw(this._dataSource);
        this.randomButton();
    }

    resetGraph() {

        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this._dataSource = [];
        var tempDataPoints = [];
        tempDataPoints.push(...this._cloneDataSource);
        this._dataSource = tempDataPoints;

        this.getPoints();
        this.setScale();
        this.drawAxes();
        this.drawAxisLabels();
        this.positionOnCanvas = [];

        this.draw(this._dataSource);
        this.randomButton();
    }

    showRange() {
        var container = document.getElementById('container');

        var lowRange = document.getElementById('low-input-value');
        var highRange = document.getElementById('high-input-value');

        if (lowRange && highRange) {
            lowRange.innerText = "";
            lowRange.innerText = this.lowRangeValue || 0;
            highRange.innerText = this.highRangeValue || 0;
        } else {
            var lowRange = document.createElement('div');
            lowRange.setAttribute('id', 'low-input-value');
            lowRange.style.position = 'absolute';
            lowRange.style.left = (this._canvas.width / 2) - 110 + 'px';
            lowRange.style.top = 10 + 'px';
            lowRange.innerHTML = this.lowRangeValue || 0;

            var highRange = document.createElement('div');
            highRange.setAttribute('id', 'high-input-value');
            highRange.style.position = 'absolute';
            highRange.style.left = (this._canvas.width / 2) + 80 + 'px';
            highRange.style.top = 10 + 'px';
            highRange.innerHTML = this.highRangeValue || 0;


            container.appendChild(lowRange);
            container.appendChild(highRange);

        }
    }

    render() {

        var container = document.createElement('div');
        container.setAttribute('id', 'container');
        var canvas = this.getCanvasElement();

        document.body.appendChild(container);
        container.appendChild(canvas);
    }

}