import Chart from './Chart.js';

class LineChart extends Chart {
    constructor(width, height, dataPoints) {
        super(width, height, dataPoints);

        this.xPoints = [];
        this.yPoints = [];

        this.Xmax;
        this.Ymax;

        this.xGap;
        this.yGap;

        this.scaleX;
        this.scaleY;

        this.offsetX = 100;
        this.offsetY = 100;

        this._color = ['red', 'blue', 'green', 'purple', 'black', 'yellow', 'pink'];

        this.getPoints(dataPoints);
        this.setScale();
        this.drawAxes();
        this.drawAxisLabels();
        this.draw(dataPoints);

        this.showInfoOnHover();

    }


    getPoints(dataPoints) {
        dataPoints.forEach(dataPoint => {
            this.xPoints.push(dataPoint.x);
            this.yPoints.push(dataPoint.y);
        });


        this.Xmax = Math.max(...this.xPoints);
        this.Ymax = Math.max(...this.yPoints);

    }

    setScale() {
        this.scaleX = (this._canvas.width - this.offsetX) / this.Xmax;
        this.scaleY = (this._canvas.height - this.offsetY) / this.Ymax;

        // console.log(this.scaleX, this.scaleY);
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
            this._context.fillText(Math.ceil(i * scaleStep), (this.offsetX / 2) - 30, startY - i * stepY + 5)
        }

        for (let i = 0; i < 10; i++) {
            let scaleStep = stepX / this.scaleX;
            this._context.moveTo(startX + i * stepX, startY);
            this._context.lineTo(startX + i * stepX, startY + length);
            this._context.stroke();
            this._context.fillText(Math.ceil(i * scaleStep), startX + i * stepX - 8, startY + 30)
        }

    }

    draw(dataPoints) {
        dataPoints.forEach(point => {
            this.drawPoint(point.x, point.y);
        });
    }

    drawPoint(xCord, yCord) {
        this._context.beginPath();
        this._context.moveTo(80, 80);
        this._context.arc((this.offsetX / 2) + (xCord * this.scaleX) - 5, this._canvas.height - (this.offsetY / 2) - (yCord) * this.scaleY, 2, 0, 2 * Math.PI);
        this._context.fillStyle = 'black';
        this._context.fill();
        // console.log(xCord * this.scaleX, (yCord) * this.scaleY)
    }

    getColor() {
        // console.log(Math.floor(Math.random() * 6));
        return this._color[Math.floor(Math.random() * 7)];
    }

    showInfoOnHover() {


        this._canvas.onmousemove = event => {
            let pointsFound = false;
            let currentX = Math.ceil(((event.clientX - this._canvas.getBoundingClientRect().left - 45) / this.scaleX));
            let currentY = Math.ceil(this._canvas.height - (event.clientY - 55) / this.scaleY)

            this._dataSource.forEach((dataPoint) => {
                if (dataPoint.x === currentX && dataPoint.y === currentY) {
                    pointsFound = true;
                }
            })


            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

            this.drawAxes();
            this.drawAxisLabels();
            this.draw(this._dataSource);

            if (pointsFound) {
                console.log(pointsFound);
                this._context.beginPath();
                this._context.rect((this.offsetX / 2) + (currentX * this.scaleX) + 5, this._canvas.height - (this.offsetY / 2) - (currentY) * this.scaleY + 5, 80, 50);
                this._context.stroke();
                this._context.fillText('x: ' + currentX, (this.offsetX / 2) + (currentX * this.scaleX) + 10, this._canvas.height - (this.offsetY / 2) - (currentY) * this.scaleY + 20);
                this._context.fillText('y: ' + currentY, (this.offsetX / 2) + (currentX * this.scaleX) + 10, this._canvas.height - (this.offsetY / 2) - (currentY) * this.scaleY + 30);

            }
        }

    }

}





var lineChart = new LineChart(500, 500, [{ x: 500, y: 80 }, { x: 80, y: 500 }, { x: 1010, y: 100 }, { x: 200, y: 380 }, { x: 170, y: 450 }]);
var canvas = lineChart.getCanvasElement();
document.body.appendChild(canvas);