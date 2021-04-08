const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const KEY = {
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40
}
Object.freeze(KEY);

const moves = {
    [KEY.LEFT]:  p => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: p => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]:    p => ({ ...p, y: p.y + 1 })
};

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

class Piece {  
    constructor(ctx) {
      this.ctx = ctx;
      this.color = 'blue';
      this.shape = [
        [2, 0, 0], 
        [2, 2, 2], 
        [0, 0, 0]
      ];
      
      this.x = 3;
      this.y = 0;
    }
    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
          row.forEach((value, x) => {
            // this.x, this.y gives the left upper position of the shape
            // x, y gives the position of the block in the shape
            // this.x + x is then the position of the block on the board
            if (value > 0) {
              this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
            }
          });
        });
    }
};

class Board {
    reset() {
      this.grid = this.getEmptyBoard();
    }
  
    getEmptyBoard() {
      return Array.from(
        {length: ROWS}, () => Array(COLS).fill(0)
      );
    }
    move(p) {
        this.x = p.x;
        this.y = p.y;
    }
  
}






let board = new Board();
function play() {
    board.reset();
    let piece = new Piece(ctx);
    piece.draw();
    
    board.piece = piece;
}

document.addEventListener('keydown', event => {
    if (moves[event.keyCode]) {  
      // Stop the event from bubbling.
      event.preventDefault();
      
      // Get new state of piece
      let p = moves[event.keyCode](board.piece);
      
      if (board.valid(p)) {    
        // If the move is valid, move the piece.
        board.piece.move(p);
        
        // Clear old position before drawing.
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
        
        board.piece.draw();
      }
    }
  });