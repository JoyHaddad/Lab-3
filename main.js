const squares = document.querySelectorAll(".row div");
const playerDisplay = document.querySelector(".display_player");
let displayX = document.querySelector(".scoreX");
let displayO = document.querySelector(".scoreO");
const resetButton = document.querySelector(".reset");
const newGame = document.querySelector(".new_game");

let currentPlayer = "X";
let gameActive = true;
let XScore = 0;
let OScore = 0;
let squaresLeft = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

playerDisplay.textContent = ` ${currentPlayer}`;
displayX.textContent = XScore;
displayO.textContent = OScore;

squares.forEach((square) => {
  square.addEventListener("click", function () {
    console.log("Square clicked!", this);
    if (gameActive && this.children[0].textContent === "") {
      this.children[0].textContent = currentPlayer;
      this.style.backgroundColor = "salmon";
      squaresLeft.splice(squaresLeft.indexOf(this.classList[0]), 1);
      const won = winner();
      if (won) {
        gameActive = false;
        console.log(won + " wins!");
        document.querySelector(".winner").textContent =
          "Player " + won + " Won!";
        updateScores(won);
      } else if (squaresLeft.length === 0) {
        console.log("It's a tie!");
        alert("It's a tie!");
      }
      if (gameActive) {
        UpdatePlayer();
      }
    }
  });
});

function UpdatePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (gameActive && currentPlayer === "O") {
    playerDisplay.textContent = ` ${currentPlayer}`;
    const randomSquareClass =
      squaresLeft[Math.floor(Math.random() * squaresLeft.length)];
    const selectedSquare = document.querySelector("." + randomSquareClass);
    if (selectedSquare && selectedSquare.children[0].textContent === "") {
      selectedSquare.children[0].textContent = currentPlayer;
      selectedSquare.style.backgroundColor = "salmon";
      squaresLeft.splice(squaresLeft.indexOf(randomSquareClass), 1);
      if (squaresLeft.length === 0 || winner()) {
        gameActive = false;
        const won = winner();
        if (won) {
          console.log(won + " wins!");
          document.querySelector(".winner").textContent =
            "Player " + won + " Won!";
          updateScores(won);
        } else {
          console.log("It's a tie!");
          alert("It's a tie!");
        }
      }
    }
    currentPlayer = "X";
  }
}

const winMatrix = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function winner() {
  for (let i = 0; i < winMatrix.length; i++) {
    const [a, b, c] = winMatrix[i];
    if (
      squares[a].children[0].textContent !== "" &&
      squares[a].children[0].textContent ===
        squares[b].children[0].textContent &&
      squares[a].children[0].textContent === squares[c].children[0].textContent
    ) {
      const winnerPlayer = squares[a].children[0].textContent;
      console.log(winnerPlayer + " wins!");
      return winnerPlayer;
    }
  }
  return null;
}

function updateScores(won) {
  if (won === "X") {
    XScore++;
  } else {
    OScore++;
  }
  displayX.textContent = XScore;
  displayO.textContent = OScore;
}

function reset() {
  squares.forEach((square) => {
    square.children[0].textContent = "";
    square.style.backgroundColor = "pink";
  });
  XScore = 0;
  OScore = 0;
  displayX.textContent = XScore;
  displayO.textContent = OScore;
  gameActive = true;
  squaresLeft = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  document.querySelector(".winner").textContent = "";
}

resetButton.addEventListener("click", function () {
  reset();
});

newGame.addEventListener("click", function () {
  squares.forEach((square) => {
    square.children[0].textContent = "";
    square.style.backgroundColor = "pink";
  });
  gameActive = true;
  squaresLeft = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  document.querySelector(".winner").textContent = "";
});
