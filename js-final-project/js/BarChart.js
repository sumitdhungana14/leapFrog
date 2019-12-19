class BarChart {
    constructor(config) {

        this.config = config;
        this.colors = this.config.colors;
        this._dataPoints = this.config.data;
        this.speed = 5;
        this.maxValue = 0;

        this.currentValue = [];
        this.barHeight = [];
        this.drawCompleted = [];
        this.initialAnimation;

        this.initCanvas();
        this.setConfigs();

        this.draw();
        this.clickOnRandomButtom();
        this.render();

    }

    initCanvas(width, height) {
        this._canvas = document.createElement('canvas');
        this._canvas.style.background = 'grey';
        this._context = this._canvas.getContext('2d');
        this._canvas.width = this.config.width;
        this._canvas.height = this.config.height;
    }

    getCanvasElement() {
        return this._canvas;
    }

    setConfigs() {

        for (let dataPoint in this._dataPoints) {
            this.maxValue = Math.max(this.maxValue, this._dataPoints[dataPoint]);
            this.currentValue.push(0);
        }

        this.canvasActualHeight = this._canvas.height - this.config.padding * 2;
        this.canvasActualWidth = this._canvas.width - this.config.padding * 2;
        this.numberOfBars = Object.keys(this._dataPoints).length;
        this.barSize = (this.canvasActualWidth) / this.numberOfBars;
        this.scale = this.canvasActualHeight / this.maxValue;

        for (let dataPoint in this._dataPoints) {
            var val = this._dataPoints[dataPoint];
            this.barHeight.push(Math.round(this.scale * val));
        }

    }

    getLine(context, startX, startY, endX, endY, color) {
        context.strokeStyle = color;
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
        context.restore();
    }

    getBar(context, upperLeftCornerX, upperLeftCornerY, width, height, color) {
        context.save();
        context.fillStyle = color;
        context.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
        context.restore();
    }

    getMousePosition(event) {
        var rect = this.getCanvasElement().getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    clickedInsideRandomButton(mousePosition) {
        return mousePosition.x > (this._canvas.width / 2) - 70 &&
            mousePosition.x < (this._canvas.width / 2) - 70 + 140 &&
            mousePosition.y < this._canvas.height - 35 + 30 &&
            mousePosition.y > this._canvas.height - 35;
    }

    draw() {

        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this.drawGrids();
        this.drawBars();
        this.drawSeriesName();
        this.drawLabels();
        this.randomButton();

        this.initialAnimation = window.requestAnimationFrame(this.draw.bind(this));

        if (this.hasInitialDrawCompleted()) {
            window.cancelAnimationFrame(this.initialAnimation);
        }
    }

    drawGrids() {

        var gridValue = 0;
        while (gridValue < this.maxValue) {
            var gridY = this.canvasActualHeight * (1 - gridValue / this.maxValue) + this.config.padding;
            this.getLine(this._context, 0, gridY, this._canvas.width, gridY, this.config.gridColor);

            this.writeGridMarkers(gridValue, gridY);
            gridValue += this.config.gridScale;
        }
    }

    writeGridMarkers(gridValue, gridY) {
        this._context.save();
        this._context.fillStyle = this.config.gridColor;
        this._context.font = "bold 10px Arial";
        this._context.fillText(gridValue, 10, gridY - 2);
        this._context.restore();

    }

    drawBars() {
        var barIndex = 0;

        for (let dataPoint in this._dataPoints) {
            this.drawCompleted[barIndex] = true;
            this.getBar(this._context, this.config.padding + barIndex * this.barSize, this._canvas.height - this.currentValue[barIndex] - this.config.padding, this.barSize, this.currentValue[barIndex], this.colors[barIndex % this.colors.length]);

            if (this.currentValue[barIndex] <= this.barHeight[barIndex]) {
                this.currentValue[barIndex] += this.speed;
                this.drawCompleted[barIndex] = false;
            }
            barIndex++;
        }
    }

    drawSeriesName() {
        this._context.save();
        this._context.textBaseline = "bottom";
        this._context.textAlign = "center";
        this._context.fillStyle = "#000000";
        this._context.font = "bold 18px Arial";
        this._context.fillText(this.config.seriesName, this._canvas.width / 2, this._canvas.height - 40);
        this._context.restore();
    }

    drawLabels() {
        var index = 0;
        for (let dataPoint in this._dataPoints) {
            this._context.beginPath();
            this._context.fillStyle = this.colors[index % this.colors.length];
            this._context.rect(5 + index * 100, 20, 20, 20);
            this._context.stroke();
            this._context.fill();
            this._context.font = '12px Arial';
            this._context.fillText([dataPoint], index * 100 + 30, 35);
            index++;
        }

    }

    randomButton() {
        this._context.beginPath();
        this._context.fillStyle = 'black';
        this._context.rect((this._canvas.width / 2) - 70, this._canvas.height - 35, 140, 30);
        this._context.stroke();
        this._context.fill();
        this._context.font = '22px Comic Sans MS';
        this._context.fillStyle = 'white';
        this._context.fillText('Randomize', (this._canvas.width / 2) - 60, (this._canvas.height) - 15);
    }

    clickOnRandomButtom() {
        this._canvas.addEventListener('click', event => {
            var mousePosition = this.getMousePosition(event);

            if (this.clickedInsideRandomButton(mousePosition)) {
                this.generateRandomData();
            }
        })
    }

    generateRandomData() {

        this.currentValue.forEach((value, index) => {
            this.currentValue[index] = 0;
        })

        this.barHeight = [];

        this._dataPoints = {
            "Real Madrid": Math.ceil(Math.random() * 20),
            "Milan": Math.ceil(Math.random() * 20),
            "Barcelona": Math.ceil(Math.random() * 20),
            "Liverpool": Math.ceil(Math.random() * 20),
            "Munich": Math.ceil(Math.random() * 20),
            "Chelsea": Math.ceil(Math.random() * 20)
        }

        this.setConfigs();
        this.draw();

    }

    hasInitialDrawCompleted() {

        return this.drawCompleted.reduce((isCompleted, val) => {
            return isCompleted && val;
        }, true);
    }

    render() {
        var canvas = this.getCanvasElement();
        document.body.appendChild(canvas);
    }

}