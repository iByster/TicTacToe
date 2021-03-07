'use strict';

// function markSquere(){
//     alert('cacat')
// }
let playerOneMark = 'X';
let playerTwoMark = 'O';
let playerOneTurn = true;
let playerTwoTurn = false;
const playerOneScore = document.querySelector('[data-score-p1]');
const playerTwoScore = document.querySelector('[data-score-p2]');
let board = [['-', '-', '-'],
             ['-', '-', '-'],
             ['-', '-', '-']];

let markCounter = 0;
let gameFinished = false;
let line;
let offset = 0;

const dic = {
    'one': [0, 0],
    'two': [0, 1],
    'three': [0, 2],
    'four': [1, 0],
    'five': [1, 1],
    'six': [1, 2],
    'seven': [2, 0],
    'eight': [2, 1],
    'nine': [2, 2]
}

const markFinishingMove = function(pos, win) {
    
    line = document.createElement('div');
    line.className = 'line';

    if(win === playerOneMark){
        line.classList.add('player-one-line-color');
    } else {
        line.classList.add('player-two-line-color');
    }

    if('horizantal' in pos) {
        
        line.classList.add('horizontal-line');
        line.classList.add('line-animation-horizontal');
        offset = pos['horizantal'] * 3;
    }
    if('vertical' in pos) {
        
        line.classList.add('vertical-line');
        line.classList.add('line-animation-vertical');
        offset = pos['vertical'];
    }

    if('diagonal-left' in pos) {
        
        line.classList.add('diagonal-line');
        line.classList.add('diagonal-line-left');
        line.classList.add('line-animation-diagonal');
        offset = pos['diagonal-left'];
    }

    if('diagonal-right' in pos) {
        
        line.classList.add('diagonal-line');
        line.classList.add('diagonal-line-right');
        line.classList.add('line-animation-diagonal');
        offset = pos['diagonal-right'];
    }

    squere[offset].appendChild(line);
}


const allEqual = arr => arr.every( v => v === arr[0]);


const updateWinnerScore = function(mark) {
    if(playerOneMark == mark){
        playerOneScore.innerText = Number(playerOneScore.innerText) + 1;
    } else {
        playerTwoScore.innerText = Number(playerTwoScore.innerText) + 1;
    }
}

const switchMarks = function() {
    if(playerOneMark === 'X'){
        playerOneTurn = true;
        playerTwoTurn = false;
    } else {
        playerOneTurn = false;
        playerTwoTurn = true;
    }
    let aux = playerOneMark;
    playerOneMark = playerTwoMark;
    playerTwoMark = aux;
    console.log(playerOneMark, playerTwoMark);
    const playersMarks = document.querySelectorAll('[data-mark');
    playersMarks[0].innerText = playerOneMark;
    playersMarks[1].innerText = playerTwoMark;
    
}

const checkGame = function() {
    let winner = '';
    let winCond = {};

    for(let i = 0; i < 3; i++){
        if(allEqual(board[i]) && board[i][1] !== '-'){
            winner = board[i][1];
            winCond['horizantal'] = i;
            console.log('1');
        }
        if((board[0][i] === board[1][i] && board[1][i] == board[2][i]) && board[0][i] !== '-'){
            winner = board[1][i];
            console.log('2');
            winCond['vertical'] = i;
        }

        if(winner) {
            break;
        }
    }

    if(!winner){
        if((board[0][0] === board[1][1] && board[1][1] === board[2][2]) && board[0][0] !== '-'){
            winner = board[0][0];
            console.log('3');
            winCond['diagonal-left'] = 0;
        }
        if((board[0][2] === board[1][1] && board[1][1] === board[2][0]) && board[0][2] !== '-'){
            winner = board[0][2];
            console.log('4');
            winCond['diagonal-right'] = 0;
        }
    }

    if(!winner && markCounter == 9){
        //draw
        alert('draw');
        switchMarks();
    } else {
        if(winner){
            gameFinished = true;
            updateWinnerScore(winner);
            markFinishingMove(winCond, winner);
            switchMarks();
            markCounter = 0;
            console.log(winner);
        } 
    }
}

            
const markSquere = function() {

    if(!gameFinished){

        const position = dic[this.dataset.squere];
        console.log(position);
        console.log(this.querySelector('img').getAttribute('src'));
        if(this.querySelector('img').getAttribute('src') === ''){

            if(playerOneTurn){
                if(playerOneMark === 'X'){
                    this.querySelector('img').src = 'images/red-cross.png';
                    board[position[0]][position[1]] = 'X';
                } else {
                    this.querySelector('img').src = 'images/red-circle.png';
                    board[position[0]][position[1]] = 'O';
                }
            } else {
                if(playerTwoMark === 'X'){
                    this.querySelector('img').src = 'images/green-cross.png';
                    board[position[0]][position[1]] = 'X';  
                } else {
                    this.querySelector('img').src = 'images/green-circle.png';
                    board[position[0]][position[1]] = 'O';
                }
            }

            console.table(board);

            playerOneTurn = !playerOneTurn;
            playerTwoTurn = !playerTwoTurn;
            markCounter++;
            

            checkGame();
        }
    }
}

const resetGame = function() {
    for(let i = 0; i < squere.length; i++){
        squere[i].querySelector('img').src = '';   
    }

    board = [['-', '-', '-'],
             ['-', '-', '-'],
             ['-', '-', '-']];


    if(gameFinished) {
        squere[offset].removeChild(line);
    }
    
    if(playerOneMark === 'X'){
        playerOneTurn = true;
        playerTwoTurn = false;
    } else {
        playerOneTurn = false;
        playerTwoTurn = true;
    }
    
    markCounter = 0;

    gameFinished = false;
}


const squere = document.querySelectorAll('[data-squere]');

const resetGameBtn = document.querySelector('[data-reset-game]');

resetGameBtn.addEventListener('click', resetGame, false);

for(let i = 0; i < squere.length; i++){
    squere[i].addEventListener('click', markSquere, false);   
}

