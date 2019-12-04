class Bird {
    constructor(context) {
        this.context = context;
        this.image = new Image();
        this.image.src = './images/bird.png';

        this.birdX = 50;
        this.birdY = 200;

        this.width = 34;
        this.height = 24;
        this.collisionRadius = 24;

        this.sX = 0;
        this.refresh = 0;

        this.maxAmp = 10;
        this.direction = 1;
        this.currentAmp = 0;

        this.speed = 1;
        this.upStep = 0;
        this.isDirectionUp = -1;

    }

    moveUp() {
        this.isDirectionUp = 1;
        this.upStep = 0;

    }

    gravityEffect(gravity) {
        if (this.isDirectionUp == 1) {
            this.upStep -= 6;
            this.speed = -4;
            gravity = 0;

            var jumpPos = 60;

            if (this.upStep <= -jumpPos) {
                this.upStep = 0;
                this.speed = 2;
                this.isDirectionUp = -1;
            }
        }

        this.speed += 0.01 * gravity;
        this.birdY += this.speed;
    }


    moveOnStartScreen() {
        if (this.direction >= 0) {
            this.currentAmp++;
            this.birdY += 1;
            if (this.currentAmp >= this.maxAmp) {
                this.direction = -1;
            }
        } else {
            this.currentAmp--;
            this.birdY -= 1;
            if (this.currentAmp <= -this.maxAmp) {
                this.direction = 1;
            }
        }
    }

    render() {
        this.context.drawImage(this.image, this.sX, 0, this.width, this.height, this.birdX, this.birdY, this.width, this.height);
    }

    flap() {
        this.refresh = ++this.refresh;

        if (this.refresh % 10 == 0) {
            this.sX = (this.sX + 56) % (56 * 3);
        }
    }
}