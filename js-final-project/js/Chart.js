class Chart {
    constructor(width, height, dataSource) {
        this.setDataSource(dataSource);
        this.initCanvas(width, height);
    }

    setDataSource(dataSource) {
        this._dataSource = dataSource;
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

}


export default Chart;