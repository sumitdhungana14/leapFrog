class Game {
    constructor(parentElem) {
        this.parentElem = parentElem;

        this.gameWidth = 288;
        this.gameHeight = 530;


        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.setAttribute('width', this.gameWidth);
        this.canvas.setAttribute('height', this.gameHeight);
        this.parentElem.appendChild(this.canvas);


        this.gravity = 10;

        this.startFresh();

        this.draw();
    }

    startFresh() {
        this.state = 'startGame';

        this.currentScore = 0;

        this.checkForInput();

        this.background = new Background(this.context);
        this.footer = new Footer(this.context);
        this.startGame = new StartGame(this.context);
        this.bird = new Bird(this.context);

        this.pipes = new Pipe(this.context);
        this.gameOver = new GameOver(this.context);

        this.isMovedUp = false;
    }

    checkForInput() {
        this.canvas.onclick = function(event) {
            event.preventDefault();
            if (this.state == 'startGame') {
                this.state = 'Playing';
                this.bird.moveUp();
            } else if (this.state == 'Playing') {
                this.isMovedUp = true;
            }
            if (this.state == 'GameOver') {
                this.state = 'startGame';
                this.startFresh();
            }
        }.bind(this);

        window.addEventListener(
            'keydown',
            function(event) {
                var pressedKey = event.key;

                if (pressedKey == ' ') {
                    event.preventDefault();

                    if (this.state == 'startGame') {
                        this.state = 'Playing';
                        this.bird.moveUp();
                    } else if (this.state == 'Playing') {
                        this.isMovedUp = true;
                    }
                    if (this.state == 'GameOver') {
                        this.startFresh();
                    }
                } else {
                    this.isMovedUp = false;
                }
            }.bind(this)
        );
    }

    draw() {
        this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);

        switch (this.state) {
            case 'startGame':
                this.background.render();

                this.footer.render(this.gameWidth, this.gameHeight);
                this.footer.move(this.gameWidth);

                this.bird.moveOnStartScreen();
                this.bird.flap();
                this.bird.render();

                this.startGame.render(this.gameWidth);
                this.showScore();

                break;

            case 'Playing':

                this.background.render();

                this.pipes.move(this.gameWidth);
                this.pipes.render();

                this.footer.render(this.gameWidth, this.gameHeight);
                this.footer.move(this.gameWidth);

                this.bird.gravityEffect(this.gravity);
                this.bird.flap();
                this.bird.render();

                if (this.isMovedUp) {
                    this.bird.moveUp();
                    this.isMovedUp = false;
                }

                this.showScore();


                //check collision with ground
                if (this.footer.didBirdCollide(this.bird, this.gameHeight)) {
                    this.gameOver.setHighScore(this.currentScore);
                    this.state = 'GameOver';
                }

                //check collision with pipes
                if (this.pipes.didBirdCollide(this.bird)) {
                    this.gameOver.setHighScore(this.currentScore);
                    this.state = 'GameOver';
                }

                if (this.pipes.pipesOut()) {
                    this.currentScore++;
                }

                break;

            case 'GameOver':
                this.background.render();
                this.pipes.render();

                this.footer.render(this.gameWidth, this.gameHeight);

                this.bird.render();

                if (!this.footer.didBirdCollide(this.bird, this.gameHeight)) {
                    this.bird.gravityEffect(this.gravity);
                }

                this.showScore();
                this.gameOver.render(this.gameWidth);

                break;
        }

        requestAnimationFrame(this.draw.bind(this));
    }

    showScore() {
        var scoreFontSize = 55;
        this.context.font = scoreFontSize + 'px Arial';
        this.context.fillStyle = '#fff';
        this.context.fillText(this.currentScore, this.gameWidth / 2 - scoreFontSize / 2 + 15, 75);
    }
}



this.element = document.getElementsByClassName('main-container')[0];
var game = new Game(this.element)
var game1 = new Game(this.element)