// VARIABLES

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

const score = document.querySelector('#score');



let hole = 1;
let holesLeft = 18;
let currPar;
let teeScore = 0;
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
    finishRound.style.display = 'none';
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
})

missRight.addEventListener('click', _ => {
    teeScore++;
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
    finishRound.style.display = 'none';

})

finishRound.addEventListener('click', createScore);

async function createScore() {
    try {
        const response = await fetch('round/createScore', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                pTeeScore: teeScore,
                pApproachScore: approachScore,
                pSgScore: sgScore,
                pToPar: toPar, 
            })
        })
        const data = await response.json()
        console.log(data)
    } catch(err) {
        console.error(err)
    }
}