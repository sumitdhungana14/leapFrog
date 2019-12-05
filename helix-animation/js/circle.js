class Circle {
    constructor(context, isOutOfPhase) {
        this.context = context;

        this.varRadius;
        this.constRadius = 10;

        this.amplitude = 50;

        this.posX;
        this.posY;

        this.currentXPos;
        this.currentY;
        this.color = 'red';

        this.phase = isOutOfPhase ? Math.PI : 0;
        this.speed = 2;
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(this.posX, this.posY, this.varRadius, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill();
    }

    oscillate() {
        this.currentXPos = ++this.currentXPos % 170;

        this.posY =
            this.amplitude *
            Math.sin((this.speed * this.currentXPos * Math.PI) / 170 + this.phase) +
            this.currentY;

        this.varRadius =
            (this.constRadius / 2) *
            Math.cos((this.speed * this.currentXPos * Math.PI) / 170 + this.phase) +
            this.constRadius / 2;
    }
}