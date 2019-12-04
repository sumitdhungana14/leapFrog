class Pipe {
    constructor(context) {
        this.context = context;

        this.pipePosition = [];

        this.width = 52;
        this.minY = -100;
        this.height = 320;

        this.gap = 100;
        this.refresh = 0;

        this.topPipe = new Image();
        this.topPipe.src = './images/top-obstacle.png';

        this.bottomPipe = new Image();
        this.bottomPipe.src = './images/bottom-obstacle.png';
        this.speed = 2;
    }

    render() {
        var self = this;
        this.pipePosition.forEach(function(singlePipe, index) {
            var topYPos = singlePipe.y;
            var bottomYPos = singlePipe.y + self.height + self.gap;

            self.context.drawImage(self.topPipe, 0, 0, self.width, self.height, singlePipe.x, topYPos, self.width, self.height);

            self.context.drawImage(self.bottomPipe, 0, 0, self.width, self.height, singlePipe.x, bottomYPos, self.width, self.height);
        })
    }


    pipesOut() {
        for (let i = 0; i < this.pipePosition.length; i++) {
            const p = this.pipePosition[i];

            if (p.x + this.width <= 0) {
                this.pipePosition.shift();
                return true;
            }
        }

        return false;
    }

    move(width) {

        this.refresh = ++this.refresh;

        if (this.refresh % 100 == 0) {
            this.pipePosition.push({
                x: width,
                y: this.minY * (Math.random() + 1)
            });
        }
        for (let i = 0; i < this.pipePosition.length; i++) {
            const p = this.pipePosition[i];
            p.x -= this.speed;
        }
    }

    didBirdCollide(bird) {
        for (let i = 0; i < this.pipePosition.length; i++) {
            const p = this.pipePosition[i];

            var bottomPipeYPos = p.y + this.height + this.gap;

            var topCollided = bird.birdX + bird.width > p.x &&
                bird.birdX < p.x + this.width &&
                bird.birdY + bird.height > p.y &&
                bird.birdY < p.y + this.height;

            var bottomCollided = bird.birdX + bird.width > p.x &&
                bird.birdX < p.x + this.width &&
                bird.birdY + bird.height > bottomPipeYPos

            if (topCollided || bottomCollided) {
                return true;
            }

        }
    }

}