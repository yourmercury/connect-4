const container = document.querySelector(".container");
const game = new GameEngine(6, 7, 4, ['green', 'red']);

function play(p, col){
    game.play(p||0, col||0, refresh);
}
function flip(p){
    game.flip(p||0, refresh);
}

function refresh(board) {
  for (let i = 0; i < container.children.length; i++) {
    let col = container.children[i];
    for (let j = 0; j < col.children.length; j++) {
      col.children[j].children[0].style.background = game.board[i][j];
    }
  }
}