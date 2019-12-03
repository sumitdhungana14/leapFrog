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
    this.gameOverMessage.style.color = '#267336';


    this.highScoreMessage = this.currentScore.cloneNode();
    this.highScoreMessage.style.top = '250px';
    this.highScoreMessage.style.fontSize = '20px';
    this.highScoreMessage.style.left = '220px';
    this.highScoreMessage.style.display = 'none';


    this.playAgainButton = document.createElement('button');
    this.playAgainButton.innerHTML = 'Play again! ';
    this.playAgainButton.style.position = 'absolute';
    this.playAgainButton.style.top = '370px';
    this.playAgainButton.style.left = '225px';
    this.playAgainButton.style.color = 'grey';
    this.playAgainButton.style.padding = '10px 5px';
    this.playAgainButton.style.textTransform = 'uppercase';
    this.playAgainButton.style.marginTop = '20px';
    this.playAgainButton.onclick = function() {
        location.reload('true');
    };
    this.playAgainButton.style.display = 'none';

    this.bulletCount = this.currentScore.cloneNode();
    this.bulletCount.style.position = 'absolute';
    this.bulletCount.style.top = '40px';
    this.bulletCount.style.left = '350px';
    this.bulletCount.style.color = '#267336';

    this.element.appendChild(this.gameOverMessage);
    this.element.appendChild(this.currentScore);
    this.element.appendChild(this.bulletCount);
    this.element.appendChild(this.highScoreMessage);
    this.element.appendChild(this.playAgainButton);
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
            this.playAgainButton.style.display = 'block';

            if (this.newHighScore) {
                this.highScoreMessage.style.display = 'block';
                this.highScoreMessage.innerHTML = 'New High Score:   ' + this.score;
            }

            // setTimeout('location.reload(true);', 2000);

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

                if (parseInt(self.totalBullet) <= 3)
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