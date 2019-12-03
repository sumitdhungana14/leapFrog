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