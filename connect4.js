/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
let GAME = document.getElementById('game')

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let x = 0; x < HEIGHT; x++) {
    let row = [];
    for (let y = 0; y < WIDTH; y++) {
      row.push(null)
    }
    board.push(row);
  }
  // console.log(board)
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById('board')
  // TODO: add comment for this code
  // Creates the top colums where the player selects x-coordinates
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // Creates the board itself
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let col = 5; col > -1; col--) {
    if ( document.getElementById(`${col}-${x}`).innerHTML == '') {
      return col
      break;
    }
  };

}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let checker = document.createElement('div');
  checker.classList.add('piece')
  
  if (currPlayer === 1) {
    checker.classList.add('p1')
    checker.style.background = p1.color
  } else {
    checker.classList.add('p2')
    checker.style.background = p2.color
  }

  // appends the checker
  let placement = document.getElementById(`${y}-${x}`)
  placement.appendChild(checker)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
  let theGame = document.getElementById('board')
  theGame.remove()
  let gamezz = document.getElementById('game');
  let idk = document.createElement('h1');
  idk.innerText = `Winner is Player ${currPlayer}`
  gamezz.append(idk)
  let removeMonitor = document.getElementById('playerMonitor');
  removeMonitor.remove()
  
}

/** handleClick: handle click of column top to play piece */
let numberOfClicks = 0;

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  
  

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1


  document.getElementById('playerMonitor').innerText = `Player ${currPlayer}'s Turn`
  
  let numberOfCells = HEIGHT * WIDTH;
  if (y !== null) {
    numberOfClicks++
  }

  if (numberOfCells === numberOfClicks) {
    currPlayer = 'No one'
    return endGame('Tie!')
  };

  console.log(numberOfClicks)
  console.log(numberOfCells)
  
  



}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}


// Create start button.
let startBtn = document.createElement('button');
startBtn.setAttribute('id','startButton');
startBtn.innerText = 'Start Game'
startBtn.addEventListener('click',startTheGame)
GAME.appendChild(startBtn)








function startTheGame(){
document.getElementById('playerMonitor').innerText = `Player ${currPlayer}'s Turn`
makeBoard();
makeHtmlBoard();
startBtn.remove()


console.log(document.getElementById('p1Color').value)
console.log(document.getElementById('p2Color').value)

p1 = new Player(document.getElementById('p1Color').value)
p2 = new Player(document.getElementById('p2Color').value)
 
document.getElementById('p1Color').remove()
document.getElementById('p2Color').remove()
};


class Game{
  constructor(p1,p2,height = HEIGHT, width = WIDTH){
    this.players = [p1,p2]
    this.height = height
    this.width = width
  }
}

class Player{
  constructor(color){
    this.color = color;
  };
}

let p1 = new Player(document.getElementById('p1Color').value)
let p2 = new Player(document.getElementById('p2Color').value)







