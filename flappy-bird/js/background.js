class Background {
    constructor(context) {
        this.context = context;
        this.image = new Image();
        this.image.src = './images/background.png';
    }

    render() {
        this.context.drawImage(this.image, 0, 0);
    }
}