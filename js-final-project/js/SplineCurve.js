class Spline {
    constructor(width, height, dataSource) {

        this.xPoints = [];
        this.yPoints = [];

        this.positionOnCanvas = [];
        this.controlPoints = [];

        this.Xmax;
        this.Ymax;

        this.Xmin;
        this.Ymin;

        this.scaleX;
        this.scaleY;

        this.offsetX = 100;
        this.offsetY = 100;

        this.initCanvas(width, height);
        this.setDataSource(dataSource);
        this.getPoints();

        this.setScale();
        this.drawAxes();
        this.drawAxisLabels();

        this.draw(dataSource);
        this.setControlPoints();
        this.drawSpline();

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

    setDataSource(dataSource) {
        this._dataSource = dataSource;
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
            this._context.fillText(Math.floor(i * scaleStep), (this.offsetX / 2) - 30, startY - i * stepY + 5)
        }

        for (let i = 0; i < 10; i++) {
            let scaleStep = (stepX / this.scaleX);
            this._context.moveTo(startX + i * stepX, startY);
            this._context.lineTo(startX + i * stepX, startY + length);
            this._context.stroke();
            this._context.fillText(Math.floor(i * scaleStep), startX + i * stepX - 8, startY + 20)
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

    setControlPoints() {
        this._dataSource.forEach((dataPoint, index) => {
            this.generateControlPoint(dataPoint, index);
        })
    }

    generateControlPoint(dataPoint, index) {

        if ((index) < (this._dataSource.length - 1)) {
            var nextPoint = this.positionOnCanvas[index + 1];
            this.calculateControlPoints(this.positionOnCanvas[index], nextPoint, index + 1);
        } else {
            return;
        }
    }

    calculateControlPoints(dataPoint, nextPoint, index) {
        if (index % 2 !== 0) {
            if (nextPoint.y > dataPoint.y) {
                var controlPoint = {
                    'x': nextPoint.x,
                    'y': dataPoint.y
                }

            } else {
                var controlPoint = {
                    'x': dataPoint.x,
                    'y': nextPoint.y
                }

            }
            this.controlPoints.push(controlPoint);
        } else {
            if (nextPoint.y > dataPoint.y) {
                var controlPoint = {
                    'x': dataPoint.x,
                    'y': nextPoint.y
                }

            } else {
                var controlPoint = {
                    'x': nextPoint.x,
                    'y': dataPoint.y
                }

            }

            this.controlPoints.push(controlPoint);
        }

    }

    drawSpline() {
        this.controlPoints.forEach((controlPoint, index) => {
            this._context.beginPath();
            this._context.moveTo(this.positionOnCanvas[index].x, this.positionOnCanvas[index].y);
            this._context.quadraticCurveTo(controlPoint.x, controlPoint.y, this.positionOnCanvas[index + 1].x, this.positionOnCanvas[index + 1].y);
            this._context.stroke();
        })
    }

    render() {
        var container = document.createElement('div');
        container.setAttribute('id', 'container');
        var canvas = this.getCanvasElement();

        document.body.appendChild(container);
        container.appendChild(canvas);

    }
}