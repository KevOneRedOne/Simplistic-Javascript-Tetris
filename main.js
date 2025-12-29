/*---------------------------------------------------------------------------
----------------Constant and Values declaration------------------------------
-----------------------------------------------------------------------------*/
const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");


const scoreElement = document.getElementById("score");
const linesElement = document.getElementById("lines");
const levelsElement = document.getElementById("level");

//creation of the variables used to create the tetris board
const ROW = 20;
const COL = 10;
const SQ = 40;
const VACANT = "black"; 

var board = [];
var score = 0;
var scorebase = 40 ;
var bonusScore = 0 ;
var lines = 0;
var niv = 0;
var gamewin = true;
var isPaused = false;

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
// The levels with the speed
const level = {
    0: 750,
    1: 700,
    2: 650,
    3: 600,
    4: 550,
    5: 500,
    6: 450,
    7: 400,
    8: 350,
    9: 300,
    10: 250,
    11: 200,
    12: 150,
    13: 100,
    14: 95,
    15: 90,
    16: 85,
    17: 80,
    18: 75,
    19: 70,
    20: 65,
    21: 60,
    22: 55,
    23: 50,
    24: 45,
    25: 40,
};









// in progress :
// const cvsNext = document.getElementById("Next");
// const ctxNext = cvsNext.getContext("2d")
// var next = [];


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
const drawBoard = () =>{
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
// var nextPiece = randomPiece();



/*---------------------------------------------------------------------------
--------------------------KeyBoard Control-----------------------------------
-----------------------------------------------------------------------------*/

document.addEventListener("keydown",CONTROL);

function CONTROL(event) {
    if(isPaused) return;

    switch (event.keyCode) {
        case 37:
        case 81: // Gauche
            p.moveLeft();
            dropStart = Date.now();
            break;
        case 38:
        case 90: // Rotation (Haut ou Z)
            p.rotate();
            dropStart = Date.now();
            break;
        case 39:
        case 68: // Droite
            p.moveRight();
            dropStart = Date.now();
            break;
        case 40:
        case 83: // Bas
            p.moveDown();
            score += 0.5;
            break;
        case 32: // Espace
            drop();
            break;
        case 27: // Échap
            tooglePause();
            break;
        case 13: // Entrée
            window.location.reload();
            break;
    }
}


/*---------------------------------------------------------------------------
--------------------------Tetrominoes Drop Down Animation--------------------
-----------------------------------------------------------------------------*/
var dropStart = Date.now();
var gameOver = false;
var anime;

const drop = () =>{
    document.querySelector('#play-btn').style.display = 'none';
    document.querySelector('#pause-btn').style.display = 'block';
    document.querySelector('#restart-btn').style.display = 'block';

    const now = Date.now();
    const delta = now - dropStart;

    if (delta >= level[niv]) {
        p.moveDown();
        dropStart = Date.now();
    }

    if (!gameOver) {
        anime = requestAnimationFrame(drop);
    } else {
        gameOverMessage();
        cancelAnimationFrame(anime);
    }
    chrono();
    showHighScores();
    calculateFPSNormal();
    updateLabel(FPSNormal);
}

const gameOverMessage = () =>{
    alert('Game Over !')
    let prompts = prompt("Enter your first name: ");
    // Detect empty value on prompt
    if (prompts == '') {
        prompts = 'AAA'
    };
    // Put the answer in uppercase and select the first 3 letters
    let nameUser = prompts.toLocaleUpperCase().substring(0,3);
    alert(
        'Player : ' + prompts + '\n' 
        + 'Initials : ' + nameUser + '\n' 
        + 'Score : ' + Math.round(score) + '\n' 
        + 'Timer : ' + gameTime
        + '\n' + '\n'  
        + 'Restart the game and see if you are in the High Scores !!' 
    );
    HighScore(nameUser);
};


/*---------------------------------------------------------------------------
-----------------------------------Chrono function----------------------------
-----------------------------------------------------------------------------*/

var start = new Date();
var end = 0;
var diff = 0;
var gameTime = "00:00:00:000";

const chrono = () => {
    end = new Date();
    diff = end - start;
    diff = new Date(diff);

    const msec = diff.getMilliseconds().toString().padStart(3, '0');
    const sec = diff.getSeconds().toString().padStart(2, '0');
    const min = diff.getMinutes().toString().padStart(2, '0');
    const hr = (diff.getHours() - 1).toString();

    gameTime = `${hr}:${min}:${sec}:${msec}`;
    document.getElementById("Timer").innerHTML = gameTime;
}


/*---------------------------------------------------------------------------
-----------------------------------Pause function----------------------------
-----------------------------------------------------------------------------*/
const tooglePause = () => {
    document.querySelector('#play-btn').style.display = 'block'
    document.querySelector('#pause-btn').style.display = 'none'
    document.querySelector('#restart-btn').style.display = 'block'
    alert('Your game is on pause !' 
    + '\n' + '\n' 
    + 'To restart the game, click "OK", then "PLAY".' + '\n'
    + 'Or Press "SPACE" twice !'
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
        score : Math.round(score), 
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







