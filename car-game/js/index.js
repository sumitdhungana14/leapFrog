const SPEED = 2;
const CAR_IMAGES = ['images/Ambulance.png', 'images/taxi.png', 'images/truck.png'];
const X_POSITION = [35, 205, 380];
const CAR_WIDTH = 120;
const CAR_HEIGHT = 120;

var count = 0;

function randomNumberGenerator(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

function Road(parent) {

    this.parent = parent;
    this.element = document.createElement('div');

    this.child = document.createElement('div');

    this.element.style.width = '100%';
    this.element.style.height = '100%';
    // this.element.style.backgroundSize = '50%';
    this.element.style.backgroundImage = "url('images/road.png')"

    this.backGroundY = 0;

    this.element.style.zIndex = '4';

    this.draw = function() {
        this.element.style.backgroundPosition = '0 ' + this.backGroundY + 'px';
    }

    this.draw();


    this.element.appendChild(this.child);
    this.parent.appendChild(this.element);


    this.move = function() {
        //change background image y-pos
        this.backGroundY += SPEED * 5;

        //call draw
        this.draw();
    }

}

function Hero(parent) {
    this.parent = parent;
    this.element = document.createElement('div');

    this.xInd = 1;
    this.xPos = X_POSITION[this.xInd];
    this.yPos = 460;

    this.element.style.position = 'absolute';
    this.element.style.height = CAR_HEIGHT + 'px';
    this.element.style.width = CAR_WIDTH + 'px';

    this.child = document.createElement('img');

    this.child.setAttribute('src', 'images/Audi.png');
    this.child.style.width = '100%';
    this.child.style.height = '100%';
    this.element.style.zIndex = '5';

    this.left = function() {
        if (this.xInd) {
            this.xInd -= 1;
            this.xPos = X_POSITION[this.xInd];
        }
        // console.log('here')
        this.draw();
    }

    this.right = function() {
        if (this.xInd != 2) {
            this.xInd += 1;
            this.xPos = X_POSITION[this.xInd];
        }

        this.draw();
    }


    this.draw = function() {
        this.element.style.top = this.yPos + 'px';
        this.element.style.left = X_POSITION[this.xInd] + 'px';
    }


    this.draw();

    this.element.appendChild(this.child);
    this.parent.appendChild(this.element);

}

function Car(parent) {

    this.parent = parent;
    this.element = document.createElement('div');
    this.xPos = X_POSITION[randomNumberGenerator(0, 2)];
    this.yPos = -10;
    this.element.style.position = 'absolute';
    this.element.style.width = CAR_WIDTH + 'px';
    this.element.style.height = CAR_HEIGHT + 'px';

    this.child = document.createElement('img');

    this.child.setAttribute('src', CAR_IMAGES[randomNumberGenerator(0, 2)]);
    this.child.style.width = '100%';
    this.child.style.height = '100%';
    this.element.style.zIndex = '5';

    this.draw = function() {
        this.element.style.top = this.yPos + 'px';
        this.element.style.left = this.xPos + 'px';
    }

    this.draw();

    this.element.appendChild(this.child);
    this.parent.appendChild(this.element);

    this.move = function() {
        this.yPos += SPEED * 5;
        this.draw();
    }

}

function Game(parent) {
    this.gundas = [];
    this.score = 0;
    this.parent = parent;
    this.element = document.createElement('div');

    this.element.style.display = 'inline-block';
    this.element.style.width = 600 + 'px';
    this.element.style.height = 600 + 'px';
    this.element.style.overflow = 'hidden';

    this.element.style.position = 'relative';


    this.road = new Road(this.element);
    this.hero = new Hero(this.element);

    this.gameOver = false;

    this.currentScore = document.createElement('span');
    this.currentScore.style.position = 'absolute';
    this.currentScore.style.top = '20px';
    this.currentScore.style.left = '400px';
    this.currentScore.style.zIndex = '10';
    this.currentScore.style.marginTop = '20px';
    this.currentScore.style.textTransform = 'uppercase';
    this.currentScore.style.fontSize = '16px';
    this.currentScore.style.fontWeight = 'bold';
    this.currentScore.style.color = '#267336';

    this.gameOverMessage = this.currentScore.cloneNode();
    this.gameOverMessage.style.top = '300px';
    this.gameOverMessage.style.left = '220px';
    this.gameOverMessage.style.display = 'none';
    this.gameOverMessage.innerHTML = 'Game over!';


    this.element.appendChild(this.gameOverMessage);
    this.element.appendChild(this.currentScore);
    this.parent.appendChild(this.element);

    this.moveEnemies = function() {
        this.currentScore.innerHTML = 'Score: ' + this.score;
        var self = this;
        self.gundas.forEach(function(gunda, index) {
            gunda.move();
            //remove gunda car from dom after they are out of game
            if (gunda.yPos >= 560) {
                gunda.element.style.display = 'none';
                self.element.removeChild(gunda.element);
                self.gundas.splice(index, 1);
                self.score += 1;
            }
        });
    }

    this.switchLane = function() {
        var self = this;
        document.onkeypress = function(event) {
            var key = event.key;
            if (key == 'a') {
                self.hero.left();
            } else if (key == 'd') {
                self.hero.right();
            }
        };
    }

    this.setHighScore = function() {
        // var highScore = parseInt(decodeURIComponent(document.cookie).split(';')[0].splice(0, 10)) || 0;
        // console.log(decodeURIComponent(document.cookie).split(';'));
        // var d = new Date();
        // d.setTime(d.getTime() + exp * 24 * 60 * 60 * 1000);
        // var expires = "expires=" + d.toUTCString();
        // document.cookie = "highscore=" + value + ";" + expires + ";SameSite=None" + ";path=/";
        // document.cookie = "highscore=15";
        // console.log(document.cookie);

        if (this.score > localStorage.getItem('score') || 0) {
            localStorage.setItem('score', this.score);
        }

    }

    this.checkForGameOver = function() {
        var self = this;
        self.gundas.forEach(function(gunda, index) {
            if (gunda.xPos < self.hero.xPos + CAR_WIDTH &&
                gunda.xPos + CAR_WIDTH > self.hero.xPos &&
                gunda.yPos < self.hero.yPos + CAR_HEIGHT &&
                gunda.yPos + CAR_HEIGHT > self.hero.yPos) {

                self.gameOver = true;
                // console.log('collision');
            }
        });

        if (this.gameOver) {
            clearInterval(this.gameInterval);
            // console.log(this.score);
            this.setHighScore();

            document.onkeypress = function(key) {
                return;
            };

            this.gameOverMessage.style.display = 'block';
            setTimeout('location.reload(true);', 2000);

        }
    }

    this.gameEventLoop = function() {
        var self = this;
        var count = 0;
        self.gameInterval = setInterval(function() {
            self.road.move();
            self.moveEnemies();
            self.checkForGameOver();
            count++;
            if (count % 50 == 0) {
                var gunda = new Car(self.element);
                self.gundas.push(gunda);

                count = 0;
            }
        }, 30);
    }


    this.init = function() {

        this.switchLane();
        this.gameEventLoop();
    }
}

function startGame() {
    var mainContainer = document.getElementsByClassName('main-container')[0];

    var welcomeMessage = document.createElement('div');
    welcomeMessage.style.margin = '10px 0';
    welcomeMessage.innerHTML = 'Welcome to Car Game.'

    var carContainer = document.createElement('div');
    var carImg = document.createElement('img');
    carImg.setAttribute('src', 'images/Audi.png');

    var playButton = document.createElement('button');
    playButton.innerHTML = 'Click to Play ';
    playButton.style.color = 'grey';
    playButton.style.padding = '10px 5px';
    playButton.style.textTransform = 'uppercase';
    playButton.style.marginTop = '20px';
    // playButton.style.textDecorationColor = 'white';

    var highScore = localStorage.getItem('score') || 0;

    var highContainer = document.createElement('div');

    highContainer.innerText = 'High Score - ' + highScore;
    highContainer.style.marginTop = '20px';
    highContainer.style.textTransform = 'uppercase';
    highContainer.style.fontSize = '16px';
    highContainer.style.fontWeight = 'bold';
    highContainer.style.color = '#C57F70';


    carContainer.appendChild(carImg);
    mainContainer.appendChild(welcomeMessage);
    mainContainer.appendChild(carContainer);
    mainContainer.appendChild(playButton);
    mainContainer.appendChild(highContainer);

    playButton.onclick = function() {
        playButton.style.display = 'none';
        welcomeMessage.style.display = 'none';
        carContainer.style.display = 'none';

        var game = new Game(mainContainer);
        game.init();
    };

}


startGame();