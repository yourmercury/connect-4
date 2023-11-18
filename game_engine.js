class GameEngine {
  board = [];
  discs = [];
  connectCount = 0;
  rows = 0;
  cols = 0;

  constructor(rows, cols, connectCount, discs) {
    this.rows = rows;
    this.cols = cols;
    this.connectCount = connectCount;
    this.discs = discs;

    for (let _ of Array(cols)) {
      this.board.push([]);
    }
  }

  play(player, col, optionalCallback) {
    const disc = this.discs[player];
    if (!disc) throw "no player found";

    if (col > this.cols) throw "column does not exist";
    if (this.board[col].length === this.rows) throw "column is full";

    this.board[col].push(disc);

    let winList = this.getWinList();

    typeof optionalCallback === "function" &&
      optionalCallback(this.board, player, disc, winList);

    return { board: this.board, player, disc, winList };
  }

  flip(player, optionalCallback) {
    const disc = this.discs[player];
    if (!disc) throw "no player found";

    this.board.forEach((item, i)=>{
        this.board[i].reverse();
    });

    let winList = this.getWinList();

    typeof optionalCallback === "function" &&
      optionalCallback(this.board, player, disc, winList);

    return { board: this.board, player, disc, winList };
  }

  getWinList() {
    const allWinsList = [];
    for (let disc of this.discs) {
      let wins = [
        //   ...this.getHorizontalWinList(disc),
        //   ...this.getVerticalWinList(disc),
        ...this.getDiagonalWinList(disc),
      ];

      allWinsList.push(wins);
    }

    return allWinsList;
  }

  getVerticalWinList(disc) {
    const board = this.board;
    let cols = this.cols;
    let pWins = [];

    for (let j = 0; j < cols; j++) {
      let first = board[j].indexOf(disc);
      let last = board[j].lastIndexOf(disc);

      let diff = last - first + 1;

      if (diff == this.connectCount) {
        let sustained = true;

        for (let i = 1; i < this.connectCount; i++) {
          if (board[j][first + i] != disc) {
            sustained = false;
            break;
          }
        }

        if (sustained) {
          pWins.push({
            fromCol: j,
            fromIndex: first,
            toCol: j,
            toIndex: first + this.connectCount - 1,
          });
        }
      }
    }

    return pWins;
  }

  getHorizontalWinList(disc) {
    const board = this.board;
    let cols = this.cols;
    let rows = this.rows;
    let p = 0;

    let pWins = [];

    let lastDisc = "";

    for (let indexOnCol = 0; indexOnCol < rows; indexOnCol++) {
      for (let i = 0; i < cols; i++) {
        let d = board[i][indexOnCol];

        if (lastDisc === d && d && d === disc) {
          p++;
        } else {
          p = 0;
        }

        if (p === this.connectCount - 1) {
          pWins.push({
            fromCol: i,
            fromIndex: indexOnCol,
            toCol: i + this.connectCount - 1,
            toIndex: indexOnCol,
          });
          p = 0;
        }

        lastDisc = board[i][indexOnCol];
      }
    }
    if (pWins.length) console.log("we have a winner");
    return pWins;
  }

  getDiagonalWinList(disc) {
    const board = [...this.board];
    const pWins = [];
    for (let i = 0; i < board.length; i++) {
      let first = board[i].indexOf(disc);
      if (first === -1) continue;
      if (i + this.connectCount > this.cols) continue;

      //checking left-up
      let last =
        board[i + this.connectCount - 1][first + this.connectCount - 1];
      let sustained = true;
      if (disc == last) {
        for (let j = 1; j < this.connectCount; j++) {
          if (board[i + j][first + j] !== disc) {
            sustained = false;
            break;
          }
        }

        if (sustained) {
          pWins.push({
            fromCol: i,
            fromIndex: first,
            toCol: i + this.connectCount - 1,
            toIndex: first + this.connectCount - 1,
          });
        }

        //checking left-down
        last = board[i + this.connectCount - 1][first - this.connectCount - 1];
        sustained = true;
        if (disc === last) {
          for (let j = 1; j < this.connectCount; j++) {
            if (board[i + j][first - j] !== disc) {
              sustained = false;
              break;
            }
          }
        }

        if (sustained) {
          pWins.push({
            fromCol: i,
            fromIndex: first,
            toCol: i + this.connectCount - 1,
            toIndex: first - this.connectCount - 1,
          });
        }

        board[i][first] = "";
      }
    }

    if(pWins.length) console.log("we have a winner");
    return pWins;
  }
}
