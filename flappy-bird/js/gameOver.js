class GameOver {
    constructor(context) {
        this.context = context;
        this.highScore = localStorage.getItem('fb-high-score') || 0;
        this.gameOverImage = new Image();
        this.gameOverImage.src = './images/game-over.png';
    }

    setHighScore(currentScore) {
        if (currentScore > localStorage.getItem('fb-high-score')) {
            this.highScore = currentScore;
            localStorage.setItem('fb-high-score', this.highScore);
        }
    }

    render(width) {
        this.context.drawImage(this.gameOverImage, width / 2 - this.gameOverImage.width / 2, 125);

        var scoreSize = 18;
        this.context.fillStyle = '#fff';
        this.context.font = scoreSize + 'px Arial';
        this.context.fillText('Best:\n' + this.highScore, width / 2 - (scoreSize * 3) / 2, 120);
    }
}