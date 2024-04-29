const squares = document.querySelectorAll('.row div'); 
const playerDisplay = document.querySelector('.display_player'); 
let displayX = document.querySelector('.scoreX'); 
let displayO = document.querySelector('.scoreO');

let currentPlayer = 'X';
playerDisplay.textContent = ` ${currentPlayer}`;  

function SquareClick() {
    squares.forEach(square => {
        square.addEventListener('click', function() {
            // console.log('Square clicked!', this);
            if (this.children[0].textContent === '') { 
                this.children[0].textContent = currentPlayer;  
                UpdatePlayer();  
                const won = winner(); 
                if (won) {
                    console.log(won + " wins!");
                    alert(won + " wins!");
                    if(won === 'X'){
                        XScore++;
                    } else {
                        OScore++;
                    }
                    updateScores();
                    squares.forEach(square => square.removeEventListener('click', SquareClick));
                }
            }
        });
    });
}

let turnsX = [];
let turnsO = [];

function resetTurns(){
    turnsX = [];
    turnsO = [];

}

function UpdatePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
    playerDisplay.textContent = ` ${currentPlayer}`;  
    if (currentPlayer === 'X') {
        turnsX.push(this); // Store X moves
    } else {
        turnsO.push(this); // Store O moves
    }
}

SquareClick();

const winMatrix = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
  ];


function winner(){
        for (let i = 0; i < winMatrix.length; i++) {
            const [a, b, c] = winMatrix[i];
            if (squares[a].children[0].textContent !== '' &&
                squares[a].children[0].textContent === squares[b].children[0].textContent &&
                squares[a].children[0].textContent === squares[c].children[0].textContent) {
                const winnerPlayer = squares[a].children[0].textContent;
                console.log(winnerPlayer + " wins!");
                return winnerPlayer;
            }
        }
        return null;
    }

    let XScore = 0;
    let OScore = 0;

    function updateScores() {
        displayX.textContent = XScore;
        displayO.textContent = OScore;
    }
    
function reset(){
    squares.forEach(square=>{
        square.children[0].textContent = '';
    });

    XScore = 0;
    OScore = 0;
    updateScores();
}

