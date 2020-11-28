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
      isMine: false,
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
      isMine: false,
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
      isMine: false,
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
      isMine: false,
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
}


// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {

  let totalSquares = board.cells.length;
  let totalMines = 0;
  let totalUnHidden = 0;
  let totalHidden = 0;
  let minesHit = false;

  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine == false && board.cells[i].hidden == false) {
      totalUnHidden += 1;
    } else if (board.cells[i].isMine == false && board.cells[i].hidden == true) {
      totalHidden += 1;
    } else if (board.cells[i].isMine == true && board.cells[i].hidden == true) {
      totalMines += 1;
    } else if ( board.cells[i].isMine == true && board.cells[i].hidden == false) {
      minesHit = true;
    }
  }

  // console.log("Mines = " + totalMines)
  // console.log("Hidden = " + totalHidden)
  // console.log("Unhidden = " + totalUnHidden)
  // console.log(minesHit)

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  if (totalSquares == (totalMines + totalUnHidden)) {
    lib.displayMessage('You win!')
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

document.getElementById('board').addEventListener('click', checkForWin)