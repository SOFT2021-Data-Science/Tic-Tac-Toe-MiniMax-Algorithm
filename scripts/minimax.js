var boardNote = document.getElementById("board-note");

function bestMove(hardMode) {
  let bool = false;
  if(hardMode == null)
    bool = true;
  if(hardMode == true) {
    bool = false;
  }
  if(hardMode == false) {
    bool = true;
  }

    // AI's turn
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // any available spots
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, 0, bool);
          board[i][j] = '';
          if (score > bestScore) {
            //console.log("Score: " + score + "\n.........")
            bestScore = score;; 
            move = { i, j };
            boardNote.innerText=`AI SCORE : ${bestScore}\n` + `AI MOVE : ${move.i}, ${move.j}`;
          }
        }
      }
    }
    board[move.i][move.j] = ai;
     currentPlayer = human;
  }
  
  let scores = {
    X: 10,
    O: -10,
    tie: 0
  };
  
  function minimax(board, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
      return scores[result];
    }  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
         // any available spots
          if (board[i][j] == '') {
            board[i][j] = ai;
            let score = minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // any available spots
          if (board[i][j] == '') {
            board[i][j] = human;
            let score = minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }
  