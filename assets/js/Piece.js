/*---------------------------------------------------------------------------
-----------------------The Object Piece--------------------------------------
-----------------------------------------------------------------------------
----------This Objet allows us to draw, rotate, move the tetrominoes----------
---------------and manage the "game over" and the score-----------------------
-----------------------------------------------------------------------------
-----------------------------------------------------------------------------*/

class Piece {
    constructor(tetromino, color) {
        this.tetromino = tetromino;
        this.color = color;

        //Starts from the first tetromino form
        this.tetrominoN = 0; 
        this.activeTetromino = this.tetromino[this.tetrominoN];

        //Sets the initial position of the pieces
        this.x = 3;
        this.y = -2;
    }

    //FillPieces method allows the tetrominoes forms to be drawn with colors 
    FillPieces(color) {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino.length; c++) {
                // Draws only occupied squares
                if (this.activeTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, color);
                }
            }
        }
    }
    //draw method is used for drawing pieces on to the board with color
    draw() {
        this.FillPieces(this.color);
    }
    //unDraw method is used to undraw pieces to the board in black color
    unDraw() {
        this.FillPieces(VACANT);
    }

    //moveDown allows the player to move the piece down
    moveDown() {
        if (!this.HitWall(0, 1, this.activeTetromino)) {
            this.unDraw();
            this.y++;
            this.draw();
        } else {
            // locks the piece and generate a new one
            this.Block();
            p = randomPiece();
        }
        calculateFPSNormal();
        updateLabel(FPSNormal);
    }
      //moveRight allows the player to move the piece to the right
    moveRight() {
        if (!this.HitWall(1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x++;
            this.draw();
        }

    }
    //moveLeft allows the player to move the piece to the left
    moveLeft() {
        if (!this.HitWall(-1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x--;
            this.draw();
        }
    }

    //rotate allows the player to rotate the piece to the right
    rotate() {
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
        let kick = 0;

        if (this.HitWall(0, 0, nextPattern)) {
            if (this.x > COL / 2) {
                //When the piece is on the right border
                kick = -1; //we move the piece to the left
            } else {
                //When the piece is on the left border
                kick = 1; //we move the piece to the right
            }
        }

        if (!this.HitWall(kick, 0, nextPattern)) {
            this.unDraw();
            this.x += kick;
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; // (0+1)%4 => 1
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.draw();
        }
    }

    Block() {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino.length; c++) {
                //Skip the vacant black squares
                if (!this.activeTetromino[r][c]) {
                    continue;
                }
                //When pieces are lock on top, the game is over
                if (this.y + r < 0) {
                    gameOver = true;
                    break;
                }
                //locks the piece
                board[this.y + r][this.x + c] = this.color;
            }
        }
        
        //remove full rows
        for (let r = 0; r < ROW; r++) {
            let isRowFull = true;
            for (let c = 0; c < COL; c++) {
                isRowFull = isRowFull && (board[r][c] != VACANT);
            }
            if (isRowFull) {
                //if the row is full
                //we move down all the rows above it
                for (let y = r ; y > 1; y--) {
                    for (let c = 0; c < COL; c++) {
                        board[y][c] = board[y - 1][c];
                    }
                }
                //the top row board[0][..] has no row above it
                for (let c = 0; c < COL; c++) {
                    board[0][c] = VACANT;
                }

                //increment the score, line and level
                score = score + bonusScore + scorebase;
                lines += 1;
                // if the level isn't 20
                if (niv != 25) {
                    // Every 5 lines, the level increase by 1.  
                    if (lines % 4 == 0) {
                        niv += 1
                        bonusScore += 40
                        levelsElement.innerHTML = niv
                    }
                // When the level is at maximum
                } else if (gamewin == true) {
                    alert(
                        "GOOD GAME !!!" + '\n' +
                        "You're at max speed !!" + '\n' + '\n' 
                        + "Keep playing to improve your score !! ")
                    gamewin = false
                    niv = 25
                }

            }
        }
        
        //update the board
        drawBoard();
        
        //update the score, lines
        scoreElement.innerHTML = Math.round(score);
        linesElement.innerHTML = lines;
        
    }
    
    //HitWall is used to verify the collision of the piece
    HitWall(x, y, piece) {
        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece.length; c++) {
                //if the square is empty, we skip it
                if (!piece[r][c]) {
                    continue;
                }
                //coordinates of the piece after movement
                let newX = this.x + c + x;
                let newY = this.y + r + y;

                //conditions
                if (newX < 0 || newX >= COL || newY >= ROW) {
                    return true;
                }
                //skip newY < 0; board[-1] will crush our game
                if (newY < 0) {
                    continue;
                }
                //check if there is a locked piece already in place
                if (board[newY][newX] != VACANT) {
                    return true;
                }
            }
        }
        return false;
    }
};

/*---------------------------------------------------------------------------
-----------------------------------------------------------------------------
-----------------------------------------------------------------------------*/
