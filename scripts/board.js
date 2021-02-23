let resetBtn = document
  .getElementById("reset-btn")
  .addEventListener("click", setup);
let boardText = document.getElementById("board-text");
let aiSwitch = document.getElementById("ai-switch");
aiSwitch.addEventListener("click", setup);

let board;
let winner;
let result;

let w;
let h;

let ai = "X";
let human = "O";
let currentPlayer;
function setup() {
  boardText.innerText = "Good luck!";
  currentPlayer = human;

  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let canvas = createCanvas(400, 400);
  canvas.mousePressed(triggerClickOnCanvas);
  canvas.parent("board-parent");
  w = width / 3;
  h = height / 3;
  bestMove(aiSwitch.checked); //If the AI switch is turned on, the AI will use minimax
  drawCanvas();
}

function equals3(a, b, c) {
  return a == b && b == c && a != "";
}

function checkWinner() {
  winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return "tie";
  } else {
    return winner;
  }
}

function triggerClickOnCanvas() {
  if (winner == null)
    if (currentPlayer == human) {
      //Make canvas clickable only if we have no winner
      // Human turn
      let i = floor(mouseX / w);
      let j = floor(mouseY / h);
      // If valid turn
      if (board[i][j] == "") {
        board[i][j] = human;
        currentPlayer = ai;
        bestMove(aiSwitch.checked);
      }
    }
  drawCanvas();
}

function drawCanvas() {
  background(255);
  strokeWeight(4);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    if (result == "tie") {
      boardText.innerText = "Tie!";
    } else {
      boardText.innerText = `${result} wins!`;
    }
  }
}
