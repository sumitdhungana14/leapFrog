class StartGame {
    constructor(context) {
        this.context = context;

        this.playButton = new Image();
        this.playButton.src = './images/tap-to-start.png';

        this.getReadyImage = new Image();
        this.getReadyImage.src = './images/get-ready.png';
    }

    render(gameWidth) {
        this.context.drawImage(this.getReadyImage, gameWidth / 2 - this.getReadyImage.width / 2, 120);

        this.context.drawImage(this.playButton, gameWidth / 2 - this.playButton.width / 2, 200);
    }
}