const NUMBER_OF_BALL = parseInt(document.currentScript.getAttribute('numberOfBall'));
const SPEED = parseInt(document.currentScript.getAttribute('speed'));

const MIN_RADIUS = 10;
const MAX_RADIUS = 15;
const BALL_COLORS_COLLECTION = ['red', 'white', 'blue', 'green', 'purple', 'black', 'yellow', 'pink'];

const MAX_WIDTH = 600;
const MAX_HEIGHT = 400;


function generateRandomNumber(lowerLimit, upperLimit) {
    var lowerLimit = Math.ceil(lowerLimit);

    var randIsZero = true;
    // while (randIsZero) {
    //     var rand = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
    //     if (rand) {
    //         randIsZero = false;
    //     }
    // }

    // return rand;
    return Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
}


function Ball(parent, isAntGame) {
    this.parent = parent;
    this.element = document.createElement('div');

    this.radius = Math.floor(Math.random() * (MAX_RADIUS - MIN_RADIUS)) + MIN_RADIUS;

    this.xPos = Math.floor(Math.random() * (MAX_WIDTH - 2 * this.radius));
    this.yPos = Math.floor(Math.random() * (MAX_HEIGHT - 2 * this.radius));

    if (isAntGame) {
        this.ant = document.createElement('img');
    }

    // this.speed = SPEED;

    //speed set to random for different ball instance
    this.speed = generateRandomNumber(1, 4) * SPEED;

    this.direction = {
        x: generateRandomNumber(-2, 2),
        y: generateRandomNumber(-2, 2)
    }


    this.render = function() {
        this.element.style.left = this.xPos + 'px';
        this.element.style.top = this.yPos + 'px';
        // console.log(this.element.style.left);
        // console.log(this.element.style.top);
        if (isAntGame) {

            if (this.direction.x == 1) {
                this.ant.setAttribute('src', './images/left-up.png');
            } else {
                this.ant.setAttribute('src', './images/right-up.png');
            }

        }
    }



    this.generate = function() {
        if (!isAntGame) {

            this.element.style.backgroundColor = BALL_COLORS_COLLECTION[generateRandomNumber(0, BALL_COLORS_COLLECTION.length)];
        }

        this.element.style.height = 2 * this.radius + 'px';
        this.element.style.width = 2 * this.radius + 'px';
        this.element.style.position = 'absolute';
        this.element.style.borderRadius = '50%';

        if (isAntGame) {
            this.ant.style.width = '100%';
            this.ant.style.height = 'auto';
            this.element.appendChild(this.ant);
        }

        this.parent.appendChild(this.element);


        //initial render balls
        this.render();
    }

    if (isAntGame) {
        this.smashAnt = function(ants) {
            var self = this;
            self.element.onclick = function() {
                self.parent.removeChild(self.element);

                for (var i = 0; i < ants.length; i++) {
                    var ant = ants[i];
                    if (ant.element === self.element) {
                        ants.splice(i, 1);
                    }
                }
            };
        }
    }

    this.moveAndCheckCollision = function(balls) {

        //update x and y position
        this.xPos += this.speed * this.direction.x;
        this.yPos += this.speed * this.direction.y;

        //check collision with boundary before rendering
        this.checkCollisionWithBoundary();

        //check collision with other balls
        this.checkCollision(balls);

        //render
        this.render();
    }

    this.checkCollisionWithBoundary = function() {

        if (this.xPos <= 0) {
            this.direction.x = 1;
        }

        if (this.xPos + 2 * this.radius >= MAX_WIDTH) {
            this.direction.x = -1;
        }

        if (this.yPos <= 0) {
            this.direction.y = 1;
        }

        if (this.yPos + 2 * this.radius >= MAX_HEIGHT) {
            this.direction.y = -1;
        }

    }

    this.checkCollision = function(balls) {
        for (var i = 0; i < balls.length; i++) {
            var ball = balls[i];

            //check collision with other balls than current ball
            var currentBall = this.element;
            var iterateBall = ball.element;

            if (currentBall != iterateBall) {
                // console.log(this.xCenter, ball.xCenter);
                var dx = this.xPos - ball.xPos;
                var dy = this.yPos - ball.yPos;
                var distance = Math.sqrt(dx * dx + dy * dy);

                //set direction after collision
                if (distance < this.radius + ball.radius) {
                    if (dx > 0) {
                        this.direction.x = 1;
                        ball.direction.x = -1;
                    } else {
                        this.direction.x = -1;
                        ball.direction.x = 1;
                    }

                    if (dy > 0) {
                        this.direction.y = 1;
                        ball.direction.y = -1;
                    } else {
                        this.direction.y = -1;
                        ball.direction.y = 1;
                    }

                    // if (this.radius < ball.radius) {
                    //     this.speed = this.speed * Math.ceil(ball.radius / this.radius);
                    // }

                }
            }
        }
    }

}

function Game(wrapper, isAntGame) {

    this.balls = [];
    this.wrapper = wrapper;
    this.element = wrapper.children[0];

    // new Ball(this.element);

    this.checkForBallOverlap = function(ball) {
        for (let i = 0; i < this.balls.length; i++) {
            const iterateBall = this.balls[i];

            var dx = ball.xPos - iterateBall.xPos;
            var dy = ball.yPos - iterateBall.yPos;

            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= ball.radius + iterateBall.radius) {
                return false;
            }
        }

        return true;
    }

    this.generateBalls = function() {
        for (var i = 0; i < NUMBER_OF_BALL; i++) {
            var ball;

            //consider ball is always overlapped with ball already existing
            var ballOverlapped = true;

            //if newly created ball is ballOverlapped, don't return i.e. Check
            while (ballOverlapped) {
                ball = new Ball(this.element, isAntGame);

                //if not return ball
                if (this.checkForBallOverlap(ball)) {
                    ballOverlapped = false;
                }
            }

            ball.generate();
            if (isAntGame) {
                ball.smashAnt(this.balls);
            }
            this.balls.push(ball);
        }

    }


    this.moveBallAndCheckCollision = function() {
        setInterval(
            function() {
                for (var i = 0; i < this.balls.length; i++) {
                    var ball = this.balls[i];
                    ball.moveAndCheckCollision(this.balls);
                }
            }.bind(this),
            33.33
        );
    }

    //generate ball, move and check for collisions
    this.generateBalls();
    this.moveBallAndCheckCollision();

}


function startGame() {
    var box = new Game(document.getElementsByClassName('box-wrapper')[0], false);
    var box = new Game(document.getElementsByClassName('box-wrapper-1')[0], true);
}


//run the game
startGame();