
const listItems = document.querySelectorAll('li')
const start10 = document.querySelector('.start10')
const half = document.getElementsByClassName('half');
const initiate = document.querySelector('#initiate')
const roundType = document.querySelector('#roundType');
const questionnaire = document.querySelector('#questionnaire');
const title = document.querySelector('#title')
const holeNum = document.querySelector('#holeNum');
const par = document.querySelector('#par');
const par3 = document.querySelector('#par3');
const par4 = document.querySelector('#par4');
const par5 = document.querySelector('#par5');
const teeShot = document.querySelector('#teeShot');
const missLeft = document.querySelector('#missLeft');
const missRight = document.querySelector('#missRight');
const gir = document.querySelector('#gir');
const missGreen = document.querySelector('#missGreen');
const shortGame = document.querySelector('#shortGame');
const badSG = document.querySelector('#badSG');
const worstSG = document.querySelector('#worstSG');
const strokes = document.querySelector('#strokes');
const totStrokes = document.querySelector('#totStrokes');
const nextHole = document.querySelector('#nextHole');
const finishRound = document.querySelector('#finishRound');
const end = document.querySelector('#end');
const score = document.querySelector('#score');
const results = document.querySelector('#results');
const teeShotTime = document.querySelector('#teeShotTime');
const approachShotTime = document.querySelector('#approachShotTime');
const shortGameTime = document.querySelector('#shortGameTime')
const currentTimer = document.querySelector('#currentTimer');
const finishTimer = document.querySelector('#finishTimer');
const typeOfPractice = document.querySelector('#typeOfPractice');

let hole = 1;
let holesLeft = 18;
let currPar;
let teeScore = 0;
let driverLeft = 0;
let driverRight = 0;
let approachScore = 0;
let sgScore = 0;
let toPar = 0;

start10.addEventListener('click', _ => {
    hole = 10
}, false)

// STYLE FUNCTIONS

initiate.addEventListener('click', _ => {
    roundType.style.display = 'none';
    questionnaire.style.display = 'block';
    teeShot.style.display = 'none';
    gir.style.display = 'none';
    shortGame.style.display = 'none';
    strokes.style.display = 'none';
    nextHole.style.display = 'none';
    end.style.display = 'none';
    finishRound.style.display = 'none';
    results.style.display = 'none';
    currentTimer.style.display = 'none';
    holeNum.innerText = hole;
})


// SELECTING ROUND TYPE AND STARTING HOLE




for (let i = 0; i < half.length; i++) {
    half[i].addEventListener('click', _ => {
        holesLeft = 9;
    }, false)
}
// SELECTING PAR

par3.addEventListener('click', _ => {
    currPar = 3
})

par4.addEventListener('click', _ => {
    currPar = 4
})

par5.addEventListener('click', _ => {
    currPar = 5
})

par.addEventListener('click', _ => {
    par.style.display = 'none';
    if (currPar >= 4) {
        teeShot.style.display = 'flex';
    } else {
        gir.style.display = 'flex'
    }
})

// TEE SHOT
missLeft.addEventListener('click', _ => {
    teeScore++;
    driverLeft++
})

missRight.addEventListener('click', _ => {
    teeScore++;
    driverRight++
})

teeShot.addEventListener('click', _ => {
    teeShot.style.display = 'none';
    gir.style.display = 'flex';
})

// GREEN IN REGULATION

missGreen.addEventListener('click', _ => {
    approachScore++;
})

gir.addEventListener('click', _ => {
    gir.style.display = 'none';
    shortGame.style.display = 'flex';
})

// SHORT GAME

badSG.addEventListener('click', _ => {
    sgScore++;
})

worstSG.addEventListener('click', _ => {
    sgScore += 2;
})

shortGame.addEventListener('click', _ => {
    shortGame.style.display = 'none';
    strokes.style.display = 'flex';
    if (holesLeft > 1) {
        nextHole.style.display = 'flex';
    } else {
        finishRound.style.display = 'flex'
    }
})

// STROKES

nextHole.addEventListener('click', _ => {
    hole++;
    holesLeft--;
    toPar += (totStrokes.value - currPar);
    holeNum.innerText = hole;
    strokes.style.display = 'none'
    nextHole.style.display = 'none'
    par.style.display = 'flex'
    console.log(`Bad Tee Shots:${teeScore}
Bad Approach Shots:${approachScore}
Short Game Mistakes:${sgScore}
Strokes to Par:${toPar}`)
})

// RESULTS 

finishRound.addEventListener('click', _ => {
    strokes.style.display = 'none';
    title.style.display = 'none';
    finishRound.style.display = 'none'
    end.style.display = 'flex';
    score.innerText = toPar
})


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

const startRange = document.querySelector('#startRange');
startRange.addEventListener('click', _ => {
    let sumOfAllScores = teeScore + approachScore + sgScore;
    let teeFraction = teeScore / sumOfAllScores;
    let approachFraction = approachScore / sumOfAllScores;
    let sgFraction = sgScore / sumOfAllScores;
    console.log(
        sumOfAllScores, teeFraction, approachFraction, sgFraction
    )

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
        if (!teeShotFin && !approachShotFin && !shortGameFin) {
            startTimer()
        }
        teeShotFin = true;
        results.style.display = 'none';
        currentTimer.style.display = 'flex';
        teeShotTime.style.backgroundColor = 'lightgreen'
        document.querySelector('#teeShotSpan').innerText = '✅'
    }
})

approachShotTime.addEventListener('click', _ => {
    if (!approachShotFin) {
        timerInterval = 0;
        timePassed = 0
        TIME_LIMIT = Math.round(approachMinutes) * 60;
        if (!teeShotFin && !approachShotFin && !shortGameFin) {
            startTimer()
        }
        approachShotFin = true
        results.style.display = 'none';
        currentTimer.style.display = 'flex';
        approachShotTime.style.backgroundColor = 'lightgreen';
        document.querySelector('#approachShotSpan').innerText = '✅'
    }
})

shortGameTime.addEventListener('click', _ => {
    if (!shortGameFin) {
        timerInterval = 0;
        timePassed = 0
        TIME_LIMIT = Math.round(sgMinutes) * 60;
        if (!teeShotFin && !approachShotFin && !shortGameFin) {
            startTimer()
        }
        shortGameFin = true
        results.style.display = 'none';
        currentTimer.style.display = 'flex';


        shortGameTime.style.backgroundColor = 'lightgreen';
        document.querySelector('#shortGameSpan').innerText = '✅'
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