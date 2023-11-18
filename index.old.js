const board = [[], [], [], [], [], [], []];

const disc = {
  p1: "green",
  p2: "red",
};

const numOfConnections = 4;

const MAX_ON_A_COL = 6;
const MAX_ON_A_ROW = 7;

function play(player, col) {
  if (board[col].length === MAX_ON_A_COL) {
    return;
  }

  board[col].push(player);
  refresh();
  isThereAWin();
}

const container = document.querySelector(".container");

function refresh() {
  for (let i = 0; i < container.children.length; i++) {
    let col = container.children[i];
    for (let j = 0; j < col.children.length; j++) {
      col.children[j].children[0].style.background = board[i][j];
    }
  }
}

function isThereAWin() {
  let horizontal = checkVertical("purple");
  if (horizontal.length) {
    alert("Player 1 wins");
  }
}

function checkHorizontal(disc) {
  let cols = MAX_ON_A_ROW;
  let rows = MAX_ON_A_COL;
  let p = 0;

  let pWins = [];

  let lastDisk = "";

  for (let indexOnCol = 0; indexOnCol < rows; indexOnCol++) {
    for (let i = 0; i < cols; i++) {
      let d = board[i][indexOnCol];

      if (lastDisk === d && d && d === disc) {
        p++;
      } else {
        p = 0;
      }

      if (p === 3) {
        pWins.push([i, indexOnCol]);
        p = 0;
      }

      lastDisk = board[i][indexOnCol];
    }
  }

  return pWins;
}

function checkVertical(disc) {
  let cols = MAX_ON_A_ROW;
  let p = 0;

  let pWins = [];

  let lastDisk = "";

  for (let j = 0; j < cols; j++) {
    let first = board[j].indexOf(disc);
    let last = board[j].lastIndexOf(disc);

    let diff = last - first + 1;

    if (diff == numOfConnections) {
      let second = board[j][first + 1];
      let third = board[j][last - 1];

      if (second == third) {
        pWins.push([j, first]);
      }
    }
  }

  return pWins;
}