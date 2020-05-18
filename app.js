const cells = document.querySelectorAll('.cell');
const board = document.querySelector('.board');
const title = document.querySelector('#titleBtn');
const about = document.querySelector('.about');
const restart = document.querySelector('#restartBtn');
var xTurn = true;
var totalMoves = 0;
var winner = '';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

title.addEventListener('click', () => {
    about.classList.remove('d-none');
});

startGame();

restart.addEventListener('click', startGame());

function startGame(){
    xTurn = true;
    totalMoves = 0;
    cells.forEach( cell => {
        cell.innerHTML = '';
        cell.classList.remove('filled');
    });
}

//Drawing X or O on the board
board.addEventListener('click', e => {
    const currentCell = e.target;
    const isCell = currentCell.classList.contains('cell');
    const isFilled = currentCell.classList.contains('filled');
    if(!isFilled && isCell){
        if(xTurn){
            currentCell.innerHTML = "x";
        }
        else{
            currentCell.innerHTML = "o";
        }
        xTurn =!xTurn;
        totalMoves++;
        currentCell.classList.remove('cell-hover');
        if(totalMoves >= 3){
            checkWinner();
        }
    }
    e.target.classList.add('filled');
});

/**
 * Hovering effect of X and O on the board
 */
board.addEventListener('mouseover', e => {
    const currentCell = e.target;
    const isCell = currentCell.classList.contains('cell');
    const isFilled = currentCell.classList.contains('filled');
    if(isCell && !isFilled){
        if(xTurn){
            currentCell.innerHTML = "x";
        }
        else{
            currentCell.innerHTML = "o";
        }
        currentCell.classList.add('cell-hover');
    }
});

board.addEventListener('mouseout', e => {
    const currentCell = e.target;
    const isFilled = currentCell.classList.contains('filled');
    const cellHover = currentCell.classList.contains('cell-hover');
    if(cellHover){
        if(isFilled){
            currentCell.classList.remove('cell-hover');
        }
        else{
            currentCell.innerHTML = "";
            currentCell.classList.remove('cell-hover');
        }
    }
});

const checkWinner = () => {
    for(var i=0; i<8; i++){
        var cell1 = cells[WINNING_COMBINATIONS[i][0]].innerHTML;
        var cell2 = cells[WINNING_COMBINATIONS[i][1]].innerHTML;
        var cell3 = cells[WINNING_COMBINATIONS[i][2]].innerHTML;
        if(cell1 == cell2 && cell1 == cell3){
            winner = cell1;
        }
    }

    if(winner.length != 0){
        gameStatus(1);
    }

    if(totalMoves === 9){
        gameStatus(2);
    }
}

const gameStatus = (status) => {
    if(status === 1){
        console.log("Winner is ", winner);
    }
    else if(status === 2){
        console.log("Game Draws!");
    }
}

