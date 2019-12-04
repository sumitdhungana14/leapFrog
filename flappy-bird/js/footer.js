class Footer {
    constructor(context) {
        this.context = context;
        this.image = new Image();
        this.image.src = './images/foreground.png';

        this.footerXPos = 0;
        this.speed = 2;
    }

    move(gameWidth) {
        this.footerXPos -= this.speed;
        if (this.footerXPos + gameWidth <= 0) this.footerXPos = 0;
    }

    didBirdCollide(bird, gameHeight) {
        if (bird.birdY + bird.image.height >= gameHeight - this.image.height) {
            return true;
        }
    }

    render(width, height) {
        this.context.drawImage(this.image, this.footerXPos, height - this.image.height, width, this.image.height);

        this.context.drawImage(this.image, this.footerXPos + width, height - this.image.height, width, this.image.height);
    }
}