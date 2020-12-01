document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [
    {
      row: 0,
      col: 0,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 0,
      col: 1,
      isMine: true,
      hidden: true,
      isMarked: false,
    },
    {
      row: 0,
      col: 2,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 0,
      col: 3,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 0,
      col: 4,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 1,
      col: 0,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 1,
      col: 1,
      isMine: true,
      hidden: true,
      isMarked: false,
    },
    {
      row: 1,
      col: 2,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 1,
      col: 3,
      isMine: true,
      hidden: true,
      isMarked: false,
    },
    {
      row: 1,
      col: 4,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 2,
      col: 0,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 2,
      col: 1,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 2,
      col: 2,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 2,
      col: 3,
      isMine: true,
      hidden: true,
      isMarked: false,
    },
    {
      row: 2,
      col: 4,
      isMine: true,
      hidden: true,
      isMarked: false,
    },
    {
      row: 3,
      col: 0,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 3,
      col: 1,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 3,
      col: 2,
      isMine: true,
      hidden: true,
      isMarked: false,
    },
    {
      row: 3,
      col: 3,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 3,
      col: 4,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 4,
      col: 0,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 4,
      col: 1,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 4,
      col: 2,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 4,
      col: 3,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
    {
      row: 4,
      col: 4,
      isMine: false,
      hidden: true,
      isMarked: false,
    },
  ]
}

function startGame() {
  for (var i = 0; i < board.cells.length; i++) {
    countSurroundingMines(board.cells[i])
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()

  checkForWin()

  addEventListener('click', checkForWin)
  addEventListener('contextmenu', checkForWin)

}

document.getElementById('board').addEventListener('click', playSound);

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {

  let totalSquares = board.cells.length;
  let totalMines = 0;
  let totalUnHidden = 0;
  let totalHidden = 0;
  let totalMarked = 0;
  let minesHit = false;

  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine == false && board.cells[i].hidden == false) {
      totalUnHidden += 1;
    } else if (board.cells[i].isMine == false && board.cells[i].hidden == true) {
      totalHidden += 1;
    } else if (board.cells[i].isMine == true && board.cells[i].hidden == true && board.cells[i].isMarked == true) {
      totalMines += 1;
      totalMarked += 1
    } else if (board.cells[i].isMine == true && board.cells[i].hidden == true) {
      totalMines += 1;
    } else if (board.cells[i].isMine == true && board.cells[i].hidden == false) {
      minesHit = true;
    }
  }

    document.getElementById('squaresLeft').innerHTML = totalHidden

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  if (totalSquares == (totalMines + totalUnHidden) && totalMarked == totalMines) {
    var sound = document.getElementById('wonAudio')
    lib.displayMessage('You win!')
    sound.play();
  }
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.

function countSurroundingMines(cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var checkMineTotal = 0;

  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine == true) {
      checkMineTotal += 1;
    }
  }
  cell['surroundingMines'] = checkMineTotal
}


function boardSize(colSize, rowSize, mineNumber) {

  board = { cells: [] }

  var gameContainerCount = document.getElementById('board').childElementCount
  var gameContainer = document.getElementById('board')

  for (var removeCounter = 0; removeCounter < gameContainerCount; removeCounter++) {
    gameContainer.removeChild(gameContainer.childNodes[0])
  }

  totalPieces = (colSize * rowSize)
  var totalPiecesCounter = 0;

  for (var colCounter = 0; colCounter < colSize; colCounter++) {
    for (var rowCounter = 0; rowCounter < rowSize && totalPiecesCounter < totalPieces; totalPiecesCounter++, rowCounter++) {
      board.cells[totalPiecesCounter] = {
        row: rowCounter,
        col: colCounter,
        isMine: false,
        hidden: true,
        isMarked: false
      }
    }
  }

  var mineCounter = 0;

  try {
    for (mineCounter = 0; mineCounter < mineNumber; mineCounter++) {
    let randNumber = (Math.round(Math.random() * board.cells.length));
    board.cells[randNumber].isMine = true;
  }} catch {
    setTimeout(boardSize(colSize, rowSize, mineNumber), 100)

  }

  startGame()
  playSound()
}

function userSubmitSize() {

  var newColumns = document.getElementById('newColumns').value;
  var newRows = newColumns;
  var newMines = document.getElementById('mineNumber').value;
  boardSize(newColumns, newRows, newMines);

}

function resetBoard() {

  var gameContainerCount = document.getElementById('board').childElementCount
  var gameContainer = document.getElementById('board')

  for (var removeCounter = 0; removeCounter < gameContainerCount; removeCounter++) {
    gameContainer.removeChild(gameContainer.childNodes[0])
  }

  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].hidden = true;
  }
  startGame()
  playSound()
}

function newLayout() {

  var getRows = 0;
  var updateRows = 0;
  var getMines = 0;

  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].row > getRows) {
      updateRows = board.cells[i].row + 1;
    }
  }

  for (var j = 0; j < board.cells.length; j++) {
    if (board.cells[j].isMine == true) {
      getMines += 1;
    }
  }

  if (getMines == 0) {
    getMines = 5;
  }

  boardSize(updateRows, updateRows, getMines);
}

function playSound() {
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].hidden == false && board.cells[i].isMine == true) {
      var sound = document.getElementById('mineHit');

      sound.play();

    } else if (board.cells[i].hidden == false && board.cells[i].isMine == false) {
      var sound = document.getElementById('noMine');

      sound.play();
    }
  }
}

setTimeout(newLayout, 100)