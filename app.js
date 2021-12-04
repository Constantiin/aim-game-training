const startBtn = document.querySelector('#startBtn');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#timeList');
const timeElement = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#00FFFF', '#7FFF00', '#3498db', '#D2691E', '#006400', '#FF8C00', '#ADFF2F', '#4B0082', '#191970', '#CD853F', '#87CEEB', '#00FF7F', '#FFFF00'];

let timer = {}

let time = 0;
let score = 0;

startBtn.addEventListener('click', event => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.dataset.time);
        screens[1].classList.add('up');
        startGame();
    };
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    };
});

function startGame() {
    setTime(time);
    createRandomCircle();
    timer = setInterval(decreaseTime, 1000);
};

function decreaseTime() {
    if (time > 0) {
        let currentTime = --time;
        if (currentTime < 10) {
            currentTime = `0${time}`;
        };
        setTime(currentTime);
    } else {
        finishGame();
        clearInterval(timer);
    };
};

function setTime(value) {
    timeElement.innerHTML = `00:${value}`;
};

function finishGame() {
    timeElement.parentNode.classList.add('hide');
    board.innerHTML = `
        <div class="finish-game-screen">
            <h1>Счёт: <span class="primary">${score}</span></h1>
            <h2>
                <a href="#" id="reloadGame">Сыграть ещё раз</a>
            </h2>
        </div>
    `;

    const reloadBtn = document.querySelector('#reloadGame');

    reloadBtn.addEventListener('click', event => {
        event.preventDefault();
        screens[1].classList.remove('up');
        board.innerHTML = '';
        timeElement.parentNode.classList.remove('hide');
        score = 0;
    });
};

function createRandomCircle() {
    const circle = document.createElement('div');
    
    const size = getRandomNumber(10, 60);

    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    let currentColor = getRandomColor();

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = `${currentColor}`;

    board.append(circle);
};

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
};