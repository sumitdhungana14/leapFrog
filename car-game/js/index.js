const SPEED = 2;
const CAR_IMAGES = ['images/Ambulance.png', 'images/taxi.png', 'images/truck.png'];
const X_POSITION = [65, 245, 420];
const CAR_WIDTH = 50;
const CAR_HEIGHT = 100;

var bulletPosition = 1;

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
            bulletPosition = this.xInd;
        }
        this.draw();
    }

    this.right = function() {
        if (this.xInd != 2) {
            this.xInd += 1;
            this.xPos = X_POSITION[this.xInd];
            bulletPosition = this.xInd;
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

function Car(parent, isPowerUp) {

    if (isPowerUp) {
        this.parent = parent;
        this.element = document.createElement('div');
        this.xPowerPos = X_POSITION[randomNumberGenerator(0, 2)] + 20;
        this.yPowerPos = -20;
        this.element.style.position = 'absolute';
        this.element.style.width = '20px';
        this.element.style.height = '20px';
        this.element.style.backgroundColor = 'red';
        this.element.style.borderRadius = '50%';

        this.element.style.zIndex = '5';
        this.dead = false;

        this.draw = function() {
            this.element.style.top = this.yPowerPos + 'px';
            this.element.style.left = this.xPowerPos + 'px';
        }

        this.draw();

        this.parent.appendChild(this.element);

        this.move = function() {
            this.yPowerPos += SPEED * 10;
            this.draw();
        }
    } else {
        this.parent = parent;
        this.element = document.createElement('div');
        this.xPos = X_POSITION[randomNumberGenerator(0, 2)];
        this.yPos = -80;
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



}

function Bullet(parent) {
    this.parent = parent;
    this.element = document.createElement('div');
    this.element.style.height = '15px';
    this.element.style.width = '20px';
    this.element.style.position = 'absolute';

    this.bulletYPos = 450;
    this.bulletXPos = X_POSITION[bulletPosition] + 20;
    this.dead = false;
    this.newHighScore = false;

    this.bullet = document.createElement('img');

    this.bullet.style.width = '100%';
    this.bullet.style.height = 'auto';
    this.bullet.setAttribute('src', 'images/bullet.png');

    this.draw = function() {

        this.element.style.left = this.bulletXPos + 'px';
        this.element.style.top = this.bulletYPos + 'px';
    }

    // this.draw();

    this.element.appendChild(this.bullet);
    this.parent.appendChild(this.element);

    this.move = function() {
        this.bulletYPos -= 3 * SPEED;
        this.draw();
    }

}

function Game(parent) {
    this.gundas = [];
    this.bullets = [];
    this.score = 0;
    this.totalBullet = 5;
    this.parent = parent;
    this.powerUps = [];
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
    this.currentScore.style.color = 'black';

    this.gameOverMessage = this.currentScore.cloneNode();
    this.gameOverMessage.style.top = '300px';
    this.gameOverMessage.style.left = '220px';
    this.gameOverMessage.style.display = 'none';
    this.gameOverMessage.innerHTML = 'Game over!';
    this.currentScore.style.color = '#267336';


    this.highScoreMessage = this.currentScore.cloneNode();
    this.highScoreMessage.style.top = '250px';
    this.highScoreMessage.style.fontSize = '20px';
    this.highScoreMessage.style.left = '220px';
    this.highScoreMessage.style.display = 'none';


    this.bulletCount = this.currentScore.cloneNode();
    this.bulletCount.style.position = 'absolute';
    this.bulletCount.style.top = '40px';
    this.bulletCount.style.left = '350px';
    this.bulletCount.style.color = '#267336';

    this.element.appendChild(this.gameOverMessage);
    this.element.appendChild(this.currentScore);
    this.element.appendChild(this.bulletCount);
    this.element.appendChild(this.highScoreMessage);
    this.parent.appendChild(this.element);

    this.moveEnemies = function() {
        this.currentScore.innerHTML = 'Score: ' + this.score;
        this.bulletCount.innerHTML = 'bullet count: ' + this.totalBullet;
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

    this.switchLaneAndGenerateBullets = function() {
        var self = this;
        document.onkeypress = function(event) {
            var key = event.key;
            if (key == 'a') {
                self.hero.left();
            } else if (key == 'd') {
                self.hero.right();
            } else if (key == 'w') {
                if (self.bullets.length === 0 && parseInt(self.totalBullet) > 0) {
                    var bullet = new Bullet(self.element);
                    self.bullets.push(bullet);
                    bullet.draw();
                    self.totalBullet -= 1;
                } else return;
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
            this.newHighScore = true;
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

            if (this.newHighScore) {
                this.highScoreMessage.style.display = 'block';
                this.highScoreMessage.innerHTML = 'New High Score:   ' + this.score;
            }

            setTimeout('location.reload(true);', 2000);

        }
    }

    this.checkForBoom = function(bullet) {
        var self = this;
        // console.log('yeah');
        self.gundas.forEach(function(gunda, index) {
            if (gunda.xPos < bullet.bulletXPos + 20 &&
                gunda.xPos + CAR_WIDTH > bullet.bulletXPos &&
                gunda.yPos < bullet.bulletYPos + 15 &&
                gunda.yPos + CAR_HEIGHT > bullet.bulletYPos) {

                gunda.element.style.display = 'none';
                self.element.removeChild(gunda.element);
                self.gundas.splice(index, 1);

                bullet.element.style.display = 'none';
                self.element.removeChild(bullet.element);

                bullet.dead = true;

                self.score += 3;

                self.bullets = self.bullets.filter(function(iterateBullet) {
                    return iterateBullet.element != bullet.element;
                })
            }
        });
    }

    this.checkForPowerUp = function() {
        var self = this;
        self.powerUps.forEach(function(powerUp, index) {
            if (self.hero.xPos < powerUp.xPowerPos + 20 &&
                self.hero.xPos + CAR_WIDTH > powerUp.xPowerPos &&
                self.hero.yPos < powerUp.yPowerPos + 15 &&
                self.hero.yPos + CAR_HEIGHT > powerUp.yPowerPos) {

                powerUp.element.style.display = 'none';
                self.element.removeChild(powerUp.element);

                powerUp.dead = true;

                self.totalBullet += 3;

                self.powerUps = self.powerUps.filter(function(iteratePowerUp) {
                    return iteratePowerUp.element != powerUp.element;
                })
            }
        });
    }


    this.gameEventLoop = function() {
        var self = this;
        var count = 0;
        var countPowerUp = 0;
        self.gameInterval = setInterval(function() {
            self.road.move();
            self.moveEnemies();
            self.checkForGameOver();
            count++;
            countPowerUp++;
            if (count % 30 == 0) {
                var gunda = new Car(self.element, false);
                self.gundas.push(gunda);

                count = 0;
            }
            if (countPowerUp % 300 == 0) {
                var powerUp = new Car(self.element, true);
                self.powerUps.push(powerUp);

            }
            self.powerUps.forEach(function(powerUp, index) {
                powerUp.move();
                self.checkForPowerUp(powerUp);
                if (powerUp.yPowerPos >= 560 && !powerUp.dead) {
                    powerUp.element.style.display = 'none';
                    self.element.removeChild(powerUp.element);
                    self.powerUps.splice(index, 1);
                }

            })

            self.bullets.forEach(function(bullet, index) {
                bullet.move();
                self.checkForBoom(bullet);
                if (bullet.bulletYPos <= 0 && !bullet.dead) {
                    bullet.element.style.display = 'none';
                    self.element.removeChild(bullet.element);
                    self.bullets.splice(index, 1);
                }
            });
        }, 30);
    }


    this.init = function() {

        this.switchLaneAndGenerateBullets();
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