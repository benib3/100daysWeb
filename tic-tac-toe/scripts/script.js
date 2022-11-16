//just for initialization of variables
let gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

const playerConfigOverlay = document.getElementById("config-overlay");
const backDrop = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const errorsOutputElement = document.getElementById("config-errors");
const activeGame = document.getElementById("active-game");
const activePlayerElement = document.getElementById("active-player-name");
const winnerPlayer = document.getElementById("winner-name");
const gameOverElement = document.getElementById("game-over");

const editButton1 = document.getElementById("edit-player-1-btn");
const editButton2 = document.getElementById("edit-player-2-btn");
const cancelButton = document.getElementById("cancel-button");
const startNewGameButton = document.getElementById("start-game-btn");
const gameBoardElement = document.getElementById("game-board");
const gameFieldElements = document.querySelectorAll("#game-board li");

editButton1.addEventListener("click", openPlayerConfig);
editButton2.addEventListener("click", openPlayerConfig);
cancelButton.addEventListener("click", closePlayerConfig);
startNewGameButton.addEventListener("click", startNewGame);

formElement.addEventListener("submit", savePlayerConfig);

for (const element of gameFieldElements) {
  element.addEventListener("click", selectGameField);
}
