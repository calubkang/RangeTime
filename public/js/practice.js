
const listItems = document.querySelectorAll('li')
const results = document.querySelector('#results');
const teeShotTime = document.querySelector('#teeShotTime');
const approachShotTime = document.querySelector('#approachShotTime');
const shortGameTime = document.querySelector('#shortGameTime')
const currentTimer = document.querySelector('#currentTimer');
const finishTimer = document.querySelector('#finishTimer');
const typeOfPractice = document.querySelector('#typeOfPractice');

results.style.display = 'none';
currentTimer.style.display = 'none';


function minutesToHours(min) {
    let hours = Math.floor(min / 60);
    let mins = Math.round(min % 60);
    if (mins < 10) {
        return `${hours}:0${mins}`
    } else {
        return `${hours}:${mins}`
    }
}

let teeMinutes
let approachMinutes
let sgMinutes

let teeScore = Number(document.querySelector('#teeShotSpan').innerHTML);
let approachScore = Number(document.querySelector('#approachShotSpan').innerText);
let sgScore = Number(document.querySelector('#shortGameSpan').innerText);

const startRange = document.querySelector('#startRange');
startRange.addEventListener('click', _ => {
    let sumOfAllScores = teeScore + approachScore + sgScore;
    let teeFraction = teeScore / sumOfAllScores;
    let approachFraction = approachScore / sumOfAllScores;
    let sgFraction = sgScore / sumOfAllScores;

    let timeAtRange = Number(document.querySelector('#timeAtRange').value);

    let defaultTime = timeAtRange / 6;

    teeMinutes = (defaultTime + (timeAtRange / 2 * teeFraction)) * 60;
    approachMinutes = (defaultTime + (timeAtRange / 2 * approachFraction)) * 60;
    sgMinutes = (defaultTime + (timeAtRange / 2 * sgFraction)) * 60;
    let teeTime = minutesToHours(teeMinutes);
    let approachTime = minutesToHours(approachMinutes);
    let sgTime = minutesToHours(sgMinutes);
    document.querySelector('#teeShotSpan').innerText = teeTime
    document.querySelector('#approachShotSpan').innerText = approachTime
    document.querySelector('#shortGameSpan').innerText = sgTime
    end.style.display = 'none';
    results.style.display = 'flex';
})

let TIME_LIMIT = 0
let timeLeft = TIME_LIMIT
let timePassed = 0;
let timerInterval

function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        if (timeLeft >= 0) {
            document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        }
        setCircleDasharray();
    }, 1000);
}
let teeShotFin, approachShotFin, shortGameFin = false

teeShotTime.addEventListener('click', _ => {
    if (!teeShotFin) {
        TIME_LIMIT = Math.round(teeMinutes) * 60;
        timerInterval = 0;
        timePassed = 0
        if (!teeShotFin) {
            startTimer()
        }
        teeShotFin = true;
        results.style.display = 'none';
        currentTimer.style.display = 'flex';
        typeOfPractice.innerText = 'Tee Shots'
        teeShotTime.style.backgroundColor = 'lightgrey'
        
    }
})

approachShotTime.addEventListener('click', _ => {
    if (!approachShotFin) {
        timerInterval = 0;
        timePassed = 0
        TIME_LIMIT = Math.round(approachMinutes) * 60;
        if (!approachShotFin) {
            startTimer()
        }
        approachShotFin = true
        results.style.display = 'none';
        currentTimer.style.display = 'flex';
        typeOfPractice.innerText = 'Approach Shots'
        approachShotTime.style.backgroundColor = 'lightgrey';
    }
})

shortGameTime.addEventListener('click', _ => {
    if (!shortGameFin) {
        timerInterval = 0;
        timePassed = 0
        TIME_LIMIT = Math.round(sgMinutes) * 60;
        if (!shortGameFin) {
            startTimer()
        }
        shortGameFin = true
        results.style.display = 'none';
        currentTimer.style.display = 'flex';
        typeOfPractice.innerText = 'Short Game'

        shortGameTime.style.backgroundColor = 'lightgrey';
    }
})

finishTimer.addEventListener('click', _ => {
    currentTimer.style.display = 'none';
    results.style.display = 'flex';
})


// ADD TIMER


const COLOR_CODES = {
    info: {
        color: "green"
    }
};

let remainingPathColor = COLOR_CODES.info.color;


document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">
    ${formatTime(timeLeft)}
  </span>
</div>
`




function formatTime(time) {

    const minutes = Math.floor(time / 60);

    let seconds = Math.round(time % 60);

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

// Divides time left by the defined time limit.
function calculateTimeFraction() {
    return timeLeft / TIME_LIMIT;
}

// Update the dasharray value as time passes, starting with 283
function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * 283
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}

// Finished Training

const finalFinish = document.querySelector('#finalFinish');

if (teeShotFin && approachShotFin && shortGameFin == true) {
    finalFinish.style.display = 'flex'
}

finalFinish.addEventListener('click', _ => {
    results.style.display = 'none';
    roundType.style.display = 'block';
    hole = 1;
    holesLeft = 18;
    teeScore = 0;
    driverLeft = 0;
    driverRight = 0;
    approachScore = 0;
    sgScore = 0; 
    toPar = 0;
})