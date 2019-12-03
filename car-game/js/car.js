const SPEED = 2;
const CAR_IMAGES = ['images/Ambulance.png', 'images/taxi.png', 'images/truck.png'];
const X_POSITION = [65, 245, 420];
const CAR_WIDTH = 50;
const CAR_HEIGHT = 100;

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