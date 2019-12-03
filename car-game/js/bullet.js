var bulletPosition = 1;


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