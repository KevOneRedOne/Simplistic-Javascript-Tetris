/*---------------------------------------------------------------------------
----------------Constant and Values declaration------------------------------
-----------------------------------------------------------------------------*/

const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const cvsNext = document.getElementById("Next");
const ctxNext = cvsNext.getContext("2d")

const scoreElement = document.getElementById("score");
const linesElement = document.getElementById("lines");

//creation of the variables used to create the tetris board
const ROW = 20;
const COL = COLUMN = 10;
const SQ = squareSize = 40;
//color of the tetris board 
const VACANT = "black"; 

// the pieces and their colors
const PIECES = [
    [Z,"red"],
    [S,"green"],
    [T,"purple"],
    [O,"yellow"],
    [L,"blue"],
    [I,"cyan"],
    [J,"orange"]
];

var board = [];
var next = [];
var score = 0;
var lines = 0;


/*---------------------------------------------------------------------------
--------------------------Tetris Board Creation------------------------------
-----------------------------------------------------------------------------*/

// DrawSquare function allows the customisation of the canvas (the board) 
const drawSquare = (x,y,color) =>{
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

// createBoad function create the tetris board
const createBoard = () => {
    for( let r = 0; r <ROW; r++){
        board[r] = [];
        for(let c = 0; c < COL; c++){
            board[r][c] = VACANT;
        }
    }
}

// draw the board
function drawBoard(){
    for(let r = 0; r <ROW; r++){
        for(let c = 0; c < COL; c++){
            drawSquare(c,r,board[r][c]);
        }
    }
}

createBoard();

drawBoard();


/*---------------------------------------------------------------------------
--------------------------Random Pieces Generator----------------------------
-----------------------------------------------------------------------------*/


function randomPiece(){
    let r = randomN = Math.floor(Math.random() * PIECES.length) // 0 -> 6
    return new Piece( PIECES[r][0],PIECES[r][1]);
}

var p = randomPiece();



/*---------------------------------------------------------------------------
--------------------------KeyBoard Control-----------------------------------
-----------------------------------------------------------------------------*/

document.addEventListener("keydown",CONTROL);

function CONTROL(event){
    if(event.keyCode == 37 || event.keyCode == 81){ //keycode 37 = arrow left / 81 = Q
        p.moveLeft();
        dropStart = Date.now();
    }else if(event.keyCode == 38 || event.keyCode == 90){ //keycode 38 = arrow up / 90 = Z
        p.rotate();
        dropStart = Date.now();
    }else if(event.keyCode == 39 || event.keyCode == 68){ //keycode 39 = arrow right / 68 = D
        p.moveRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40 || event.keyCode == 83){ // keycode 40 = arrow down / 83 = S
        p.moveDown();
    } else if (event.keyCode == 32) { // keycode 32 = Space 
        p.moveDown();
    } else if (event.keyCode == 27) { // keycode 27 = Escape
        pause();
    }

}


/*---------------------------------------------------------------------------
--------------------------Tetrominoes Drop Down Animation--------------------
-----------------------------------------------------------------------------*/

//The static Date.now() method returns the number of milliseconds elapsed since January 1
var dropStart = Date.now();
var gameOver = false;

function drop(){
    document.querySelector('#play-btn').style.display = 'none'
    document.querySelector('#pause-btn').style.display = 'block'
    document.querySelector('#restart-btn').style.display = 'block'
    
    

    let now = Date.now();
    let delta = now - dropStart;

    // drop the piece every 800ms
    if(delta > 800){
        p.moveDown();
        dropStart = Date.now();
    }
    if(!gameOver){
        anime = requestAnimationFrame(drop);
    } else {
        alert('Game Over !')
        var prompts = prompt("Enter your first name: ");
        // Detect empty value on prompt
        if (prompts == '') {
            prompts = 'AAA'
        };
        // Put the answer in uppercase and select the first 3 letters
        var nameUser = prompts.toLocaleUpperCase().substring(0,3);
        alert(
            'Player : ' + prompts + '\n' 
            + 'Initials : ' + nameUser + '\n' 
            + 'Score : '+ score
            + '\n' + '\n'  
            + 'Restart the game and see if you are in the High Scores !!' 
        );
        cancelAnimationFrame(anime)
        HighScore(nameUser);
    }

    showHighScores();

    calculateFPSNormal();
    updateLabel( FPSNormal );
}

/*---------------------------------------------------------------------------
-----------------------------------Pause function----------------------------
-----------------------------------------------------------------------------*/
const pause = () => {
    document.querySelector('#play-btn').style.display = 'block'
    document.querySelector('#pause-btn').style.display = 'none'
    document.querySelector('#restart-btn').style.display = 'block'
    alert('Your game is on pause !' 
    + '\n' + '\n' 
    +  'To restart the game, click "OK", then "PLAY".'
    );
    cancelAnimationFrame(anime)
}


/*---------------------------------------------------------------------------
--------------------------------High Scores----------------------------------
-----------------------------------------------------------------------------*/

//HighScore function is used to set in local storage of the player the High Scores 
const HighScore = (nameUser) => {
    const highScores= JSON.parse(localStorage.getItem("highScores")) || [] ;
    //Sets a maximum highScores
    const MAX_HIGH_SCORES = 10
    //Sets an object Scores
    const Scores = {
        playername : nameUser,
        score : score 
    }
    highScores.push(Scores);
    highScores.sort((a,b) =>  b.score - a.score)
    highScores.splice(MAX_HIGH_SCORES);
    
    const highScoresList = document.getElementById('highScores');

    highScoresList.innerHTML = highScores
    .map((Scores) => `<li> ${Scores.playername} - ${Scores.score} `)
    .join(' ');
    

    // Updates the local storage of the user with the JSON.stringify
    localStorage.setItem('highScores', JSON.stringify(highScores));
      
}

//showHighScores is a function that displays scores when the game is started
const showHighScores = () => {
    const highScores= JSON.parse(localStorage.getItem("highScores")) || [] ;
    const highScoresList = document.getElementById('highScores');

    highScoresList.innerHTML = highScores
        .map((Scores) => `<li> ${Scores.playername} - ${Scores.score} `)
        .join(' ');
}




