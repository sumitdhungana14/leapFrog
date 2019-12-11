import Chart from './Chart.js';

class ScatterPlot extends Chart {
    constructor(width, height, dataSource) {
        super(width, height);

        this.xPoints = [];
        this.yPoints = [];

        this.positionOnCanvas = [];

        this.Xmax;
        this.Ymax;

        this.xGap;
        this.yGap;

        this.scaleX;
        this.scaleY;

        this.offsetX = 100;
        this.offsetY = 100;

        this._color = ['red', 'blue', 'green', 'purple', 'black', 'yellow', 'pink'];

        this.setDataSource(dataSource);

        this.getPoints(dataSource);
        this.setScale();
        this.drawAxes();
        this.drawAxisLabels();
        this.draw(dataSource);

        this.showInfoOnHover();
        this.randomButton();

        this.checkClickOnRandomize();

    }

    setDataSource(dataSource) {
        this._dataSource = dataSource;
    }


    getMousePosition(event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    mouseIsInsideRandomButton(mousePosition) {
        return mousePosition.x > 225 && mousePosition.x < 225 + 100 && mousePosition.y < 475 + 20 && mousePosition.y > 475;
    }

    checkClickOnRandomize() {
        this._canvas.addEventListener('click', event => {
            var mousePosition = this.getMousePosition(event);

            if (this.mouseIsInsideRandomButton(mousePosition)) {
                this.generateRandomPoints();
            }
        })


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
            this._context.fillText(Math.ceil(i * scaleStep), startX + i * stepX - 8, startY + 20)
        }

    }

    draw(dataPoints) {
        dataPoints.forEach(point => {
            this.drawPoint(point.x, point.y);
        });
    }

    drawPoint(xCord, yCord) {
        var pointOnCanvasX = (this.offsetX / 2) + (xCord * this.scaleX) - 5;
        var pointOnCanvasY = this._canvas.height - (this.offsetY / 2) - (yCord) * this.scaleY;

        if (this.positionOnCanvas.length < this._dataSource.length) {
            this.positionOnCanvas.push({ 'x': pointOnCanvasX, 'y': pointOnCanvasY });
            console.log(this.positionOnCanvas);
        }


        this._context.beginPath();
        this._context.moveTo(80, 80);
        this._context.arc(pointOnCanvasX, pointOnCanvasY, 2, 0, 2 * Math.PI);
        this._context.fillStyle = 'black';
        this._context.fill();
    }

    getColor() {
        return this._color[Math.floor(Math.random() * 7)];
    }


    mouseIsOnPoint(position, mousePosition) {
        return mousePosition.x > position.x && mousePosition.x < position.x + 4 && mousePosition.y < position.y + 4 && mousePosition.y > position.y;
    }

    showInfoOnHover() {
        this._canvas.onmousemove = event => {
            var mousePosition = this.getMousePosition(event);
            let pointsFound = false;
            let currentX = Math.ceil(((event.clientX - this._canvas.getBoundingClientRect().left - 45) / this.scaleX));
            let currentY = Math.ceil(this._canvas.height - (event.clientY - 55) / this.scaleY)

            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

            this.drawAxes();
            this.drawAxisLabels();
            this.draw(this._dataSource);
            this.randomButton();

            this.positionOnCanvas.forEach((position, index) => {
                if (this.mouseIsOnPoint(position, mousePosition)) {
                    this._context.beginPath();
                    this._context.rect(position.x + 8, position.y + 8, 80, 50);
                    this._context.stroke();
                    this._context.fillText('x: ' + this._dataSource[index].x, position.x + 20, position.y + 30);
                    this._context.fillText('y: ' + this._dataSource[index].y, position.x + 20, position.y + 50);
                    // console.log('here');
                }
            })
        }

    }

    randomButton() {

        this._context.beginPath();
        this._context.rect(225, 475, 100, 20);
        this._context.stroke();
        this._context.fillText('Randomize', 248, 488);

    }

    generateRandomPoints() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);


        this._dataSource = [];
        for (let i = 0; i <= 5; i++) {
            this._dataSource.push({ 'x': Math.ceil(Math.random() * 1000), 'y': Math.ceil(Math.random() * 1000) });
        }

        this.getPoints(this._dataSource);
        this.setScale();
        this.drawAxes();
        this.drawAxisLabels();
        this.positionOnCanvas = [];
        this.draw(this._dataSource);
        this.randomButton();
    }

}


var lineChart = new ScatterPlot(500, 500, [{ x: 500, y: 80 }, { x: 80, y: 500 }, { x: 1010, y: 100 }, { x: 200, y: 380 }, { x: 170, y: 450 }, { x: 300, y: 400 }]);
var canvas = lineChart.getCanvasElement();
document.body.appendChild(canvas);