class Spline {
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

        this.initCanvas(width, height);
        this.setDataSource(dataSource);
        this.getPoints(dataSource);

        this.setScale();
        this.drawAxes();
        this.drawAxisLabels();

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

        console.log(this._dataSource);

    }

    render() {
        var container = document.createElement('div');
        container.setAttribute('id', 'container');
        var canvas = this.getCanvasElement();

        document.body.appendChild(container);
        container.appendChild(canvas);
    }
}