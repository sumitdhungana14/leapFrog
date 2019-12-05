class Helix {
    constructor() {
        this.canvas = document.getElementById('helix-animation');
        this.context = this.canvas.getContext('2d');

        this.yGap = 20;
        this.xGap = 28;

        this.circles = [];

        this.rows = 10;
        this.columns = 13;
        this.phaseShift = 8;

        this.initialYPos = 78;

        this.generateCircles();
        this.draw();
    }

    generateCircles() {

        //upper strand
        var currentYPos = this.initialYPos;

        for (let i = 0; i < this.rows; i++) {
            currentYPos += this.yGap;

            var currentXPos = 0;
            var currentPhase = 0;

            for (let j = 0; j < this.columns; j++) {
                var circle = new Circle(this.context, false);
                circle.posX = currentXPos += this.xGap;
                circle.posY = currentYPos;

                circle.currentXPos = currentPhase += this.phaseShift;
                circle.currentY = currentYPos;

                this.circles.push(circle);
            }
        }

        //lower strand

        currentYPos = this.initialYPos;

        for (let i = 0; i < this.rows; i++) {
            currentYPos += this.yGap;

            var currentPhase = 0;
            var currentXPos = 0;
            for (let j = 0; j < this.columns; j++) {
                var circle = new Circle(this.context, true);
                circle.posX = currentXPos += this.xGap;
                circle.posY = currentYPos;

                circle.currentXPos = currentPhase += this.phaseShift;
                circle.currentY = currentYPos;

                this.circles.push(circle);
            }
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.circles.forEach(function(circle) {
            circle.oscillate();
            circle.draw();
        })

        requestAnimationFrame(this.draw.bind(this));
    }
}

var helix = new Helix();