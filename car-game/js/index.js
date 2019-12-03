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

        var player = new Game(mainContainer);
        player.init();
    };

}


startGame();