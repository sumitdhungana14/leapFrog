import Chart from './Chart.js';

class PieChart extends Chart {

    constructor(width, height, dataPoints) {
        super(width, height);









        this.draw();

    }

    draw() {

    }

}

var pieChart = new PieChart(500, 500, []);
var canvas = pieChart.getCanvasElement();
document.body.appendChild(canvas);