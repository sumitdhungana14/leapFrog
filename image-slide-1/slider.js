var IMAGE_WIDTH = 800;
var SLIDE = 8;

// var imageWrapperLeft;


var images = Array.from(document.getElementsByTagName('img'));
var rightArrow = document.getElementsByClassName('right-arrow')[0];
var leftArrow = document.getElementsByClassName('left-arrow')[0];
var imageWrapper = document.getElementsByClassName('image-wrapper')[0];

var indicatorContainer = Array.from(document.getElementsByClassName('indicator-container'))[0];

var IMG_LENGTH = images.length;
var index = 0;
var count = 0;
var sliding = true;

var newInterval;

images.forEach((el, index) => {
    el.style.left = (index * IMAGE_WIDTH) + 'px';
    var indicator = document.createElement('span');
    indicator.classList.add('span-wrapper');
    indicatorContainer.appendChild(indicator);
});


var indicators = Array.from(document.getElementsByTagName('span'));
// console.log(indicators);
indicators[0].style.background = 'grey'

indicators.forEach(function(el,index){
    indicators[index].addEventListener('click', function(){
        if(sliding){
            // clearInterval(interval);
            slideFromIndicator(index);
        }
    })
})

var clickRightArrow = rightArrow.addEventListener('click', function () {
    // console.log(sliding);
    if (sliding) {
        clearInterval(interval);
        shiftLeft();
        interval = setInterval(function () {
            shiftLeft();
        }, 4000);
    }
})

var clickLeftArrow = leftArrow.addEventListener('click', function () {
    if (sliding) {
        clearInterval(interval);
        shiftRight();
        interval = setInterval(function () {
            shiftLeft();
        }, 4000);
    }
})


function shiftLeft() {
    indicators[index].style.background = 'white';
    //   disableButtons();
    sliding = false;
    if (index < IMG_LENGTH - 1) {

        ++index;
        console.log(index);
        var interval = setInterval(function () {
            imageWrapper.style.left = String(++count * (-SLIDE) + 'px');
            // console.log(count);
            // console.log(imageWrapper.style.left);
        }, 20);

        setTimeout(function () {
            clearInterval(interval);
            sliding = true;
            indicators[index].style.background = 'grey';

        }, 2000);
    }
    else {
        var counter = 0;
        var currentLeft = Number(imageWrapper.style.left.slice(0, -2));
        var slide = -(currentLeft / 2000) * 20;
        var interval = setInterval(function () {
            ++counter;
            imageWrapper.style.left = String(currentLeft + counter * slide + 'px');
            // console.log(imageWrapper.style.left);
        }, 20);

        setTimeout(function () {
            clearInterval(interval);
            index = 0;
            count = 0;
            sliding = true;
            indicators[index].style.background = 'grey';

        }, 2000);

    }
    // indicators[index].style.background = 'white';
}


function shiftRight() {
    indicators[index].style.background = 'white';


    sliding = false;
    if (!index) {
        // console.log(index);
        
        // console.log('okay');
        var counter = 0;
        var currentLeft = Number(imageWrapper.style.left.slice(0, -2));
        // console.log(currentLeft);
        var slide = -((IMG_LENGTH-1) * IMAGE_WIDTH  / 2000) * 20;
        // console.log(slide);
        var interval = setInterval(function () {
            ++counter;
            imageWrapper.style.left = String(currentLeft + counter * slide + 'px');
            
            // console.log(imageWrapper.style.left);
        }, 20);

        setTimeout(function () {
            clearInterval(interval);
            index = IMG_LENGTH-1;
            count = 0;
            indicators[index].style.background = 'grey';

            sliding = true;
        }, 2000);
    }
    else {
        // console.log('also okay');
        
        --index;
        // console.log(index);
        var newCurrentLeft = Number(imageWrapper.style.left.slice(0, -2));
        // console.log(newCurrentLeft);
        var interval = setInterval(function () {
            // var temp = 0;
            // console.log(count);
            if(!count){
                count = (index+1)*100;
            }
            // else{
            //     count = (index+1) * 100;
            // }
            imageWrapper.style.left = String( --count * (-SLIDE) + 'px');
            // console.log(imageWrapper.style.left);
        }, 20);

        setTimeout(function () {
            clearInterval(interval);
            sliding = true;
            indicators[index].style.background = 'grey';

        // index = IMG_LENGTH - 2;
            // console.log(index);
        }, 2000);
    }

}

function slideFromIndicator(toIndex){


    console.log(toIndex);
    var current = Number(imageWrapper.style.left.slice(0,-2)) || 0 ;
    var slideTo = toIndex * (-IMAGE_WIDTH);
    var velocity = ((current - slideTo) / 2000) * 20;
    var currentIndex = Math.abs(current/IMAGE_WIDTH) ; 
    var counter = 0;
    // if(index < currentIndex){
    //   newInterval = setInterval(function(){
    //         imageWrapper.style.left = String(current + ++counter * (velocity) + 'px')
    //         // console.log(imageWrapper.style.left);
    //     }, 20);


    //     setTimeout(function(){
    //         // clearInterval(interval);
    //         clearInterval(newInterval);
    //         indicators[toIndex].style.background = 'grey';
    //         indicators[currentIndex].style.background = 'white';
    //         newInterval = setInterval(function () {
    //             index = toIndex + 2 ;
    //             shiftLeft();
    //         }, 4000);
    //     }, 2000)
    //     // velocity = -velocity;
    // }

    // else{

    //     newInterval = setInterval(function(){
    //         imageWrapper.style.left = String(current - ++counter * (velocity) + 'px')
    //         // console.log(imageWrapper.style.left);
    //     }, 20);
    
    //     console.log(current, slideTo, toIndex, currentIndex, velocity);
        
    
    //     setTimeout(function(){
    //         // clearInterval(interval);
    //         clearInterval(newInterval);
    //         indicators[toIndex].style.background = 'grey';
    //         indicators[currentIndex].style.background = 'white';
    //         count = toIndex * 100;
    //         newInterval = setInterval(function () {
    //             index = toIndex + 2;
    //             shiftLeft();
    //         }, 4000);

    //     }, 2000);
    // }

   

}



var interval = setInterval(function () {
    // console.log('here');
    indicators[index].style.background = 'white';
    shiftLeft();
}, 4000);




