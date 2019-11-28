const IMG_SIZE = 500;

function createWrapper(wrapper) {
    this.element = wrapper;
    this.element.style.width = ((wrapper.children.length + 1) * IMG_SIZE) + 'px';
    this.element.style.float = 'left';
    this.element.style.marginLeft = '0';
}

function createArrowButton(flag) {
    this.element = document.createElement('button');
    this.element.style.border = 'none';
    this.element.style.position = 'absolute';
    this.element.style.top = '50%';
    this.element.style.width = '25px';
    this.element.style.height = '25px';
    this.isLeft = flag;

    if (flag) {
        this.element.style.left = 0;
        this.element.style.background = 'url(images/arrow-left.png) no-repeat';
    } else {
        this.element.style.right = 0;
        this.element.style.background = 'url(images/arrow-right.png) no-repeat';
    }

}

function createIndicators(wrapper) {
    this.element = document.createElement('ul');

    this.element.style.position = 'absolute';
    this.element.style.left = '50%';
    this.element.style.bottom = '0';
    this.element.style.transform = 'translate(-50%, 0)';

    for (var i = 0; i < wrapper.children.length; i++) {
        var indicatorListElement = document.createElement('li');
        var indicator = document.createElement('button');
        indicator.style.width = '20px';
        indicator.style.height = '20px';
        indicator.style.backgroundColor = '#B6523D';
        indicator.style.borderRadius = '5px';
        indicatorListElement.appendChild(indicator);

        indicatorListElement.style.listStyle = 'none';
        indicatorListElement.style.float = 'left';
        indicatorListElement.style.marginRight = '10px';

        this.element.appendChild(indicatorListElement);
    }

}

function Carousel(aT, hT, carouselDiv) {

    this.element = carouselDiv;
    this.wrapper = carouselDiv.children[0];

    this.presentImage = 0;

    this.animationTime = aT;
    this.holdTime = hT;

    this.width = IMG_SIZE;

    this.init = function() {

        //initialize buttons 
        this.leftArrow = new createArrowButton(true);
        this.rightArrow = new createArrowButton(false);

        this.animateOnButtonClick(this.leftArrow);
        this.animateOnButtonClick(this.rightArrow);

        this.element.appendChild(this.leftArrow.element);
        this.element.appendChild(this.rightArrow.element);

        //initialize indicators
        this.indicatorsContainer = new createIndicators(this.wrapper);
        this.element.appendChild(this.indicatorsContainer.element);
        this.animateOnIndicatorsClick();

        //initialize carousel-image-wrapper
        this.wrapperElement = new createWrapper(this.wrapper);

        this.startSlide();
    };

    this.animateOnIndicatorsClick = function() {
        indicators = this.indicatorsContainer.element.children;

        for (let i = 0; i < indicators.length; i++) {
            if (i == this.presentImage) {
                indicators[i].style.backgroundColor = 'black';
            } else {
                indicators[i].style.backgroundColor = '#ffffff';
            }
            indicators[i].onclick = function() {
                var slideStep = this.presentImage - i;

                if (slideStep >= 0) {
                    left = 1;
                } else {
                    left = -1;
                }
                if (slideStep != 0) {
                    this.presentImage = i;
                    this.slideWrapper(left, IMG_SIZE * left * slideStep);
                }
            }.bind(this);
        }
    };

    this.animateOnButtonClick = function(arrowButton) {
        arrowButton.element.onclick = function() {
            var left;
            var images = this.wrapper.children;
            var imageSize = images.length;

            if (arrowButton.isLeft) {
                left = 1;
            } else {
                left = -1;
            }

            if (!arrowButton.isLeft && this.presentImage >= imageSize - 1) {
                this.slideWrapper(1, IMG_SIZE * --imageSize);
                this.presentImage = 0;
            } else if (arrowButton.isLeft && this.presentImage <= 0) {
                this.slideWrapper(-1, IMG_SIZE * --imageSize);
                this.presentImage = imageSize - 1;
            } else {
                this.slideWrapper(left, IMG_SIZE);
                this.presentImage -= left;
            }
        }.bind(this);
    };

    this.slideWrapper = function(to, nextPos) {
        var wrapper = this.wrapper;

        var velocity = (nextPos / IMG_SIZE) * 10;
        var currentPos = 0;
        var previousLeft = wrapper.style.marginLeft;
        var notSliding = false;
        var marginLeft;
        var currentStep;

        this.disableButtonFunctionality(true);
        clearInterval(this.interval);

        setTimeout(
            function() {
                wrapper.style.marginLeft =
                    parseInt(previousLeft) + to * nextPos + 'px';

                notSliding = true;

                this.disableButtonFunctionality(false);
                this.animateOnIndicatorsClick();
                this.startSlide();
            }.bind(this),
            1000
        );

        setInterval(function() {
            if (!notSliding && currentPos <= nextPos) {
                currentPos += velocity;
                wrapper.style.marginLeft =
                    parseInt(wrapper.style.marginLeft) + to * velocity + 'px';
            }
        }, 18);
    };


    this.startSlide = function() {
        this.interval = setInterval(
            function() {
                var imageLength = this.wrapper.children.length;
                if (this.presentImage >= imageLength - 1) {
                    this.slideWrapper(1, IMG_SIZE * (imageLength - 1));
                    this.presentImage = 0;
                } else {
                    this.slideWrapper(-1, IMG_SIZE);
                    this.presentImage++;
                }
            }.bind(this),
            this.holdTime
        );
    };

    this.disableButtonFunctionality = function(sliding = true) {
        this.leftArrow.element.disabled = sliding;
        this.rightArrow.element.disabled = sliding;

        buttons = this.indicatorsContainer.element.children;
        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i].children[0];
            button.disabled = sliding;
        }
    };
}

var carousels = Array.from(document.getElementsByClassName('carousel-container'));

carousels.forEach(function(carousel, index) {
    var carouselObject = new Carousel(1000, 2000, carousel);
    carouselObject.init();
})