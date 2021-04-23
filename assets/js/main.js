/*---------------------------------------------------------------------------
----------------Constant and Values declaration------------------------------
-----------------------------------------------------------------------------*/

const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const cvsNext = document.getElementById("Next");
const ctxNext = cvsNext.getContext("2d")

const scoreElement = document.getElementById("score");

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
    if(event.keyCode == 37){
        p.moveLeft();
        dropStart = Date.now();
    }else if(event.keyCode == 38){
        p.rotate();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        p.moveRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        p.moveDown();
    }
}

/*---------------------------------------------------------------------------
--------------------------Tetrominoes Drop Down Animation--------------------
-----------------------------------------------------------------------------*/
var dropStart = Date.now();
var gameOver = false;

function drop(){
    document.querySelector('#play-btn').style.display = 'none'
    document.querySelector('#pause-btn').style.display = 'block'
    document.querySelector('#restart-btn').style.display = 'block'
    
    showHighScores();

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
        const nameUser = prompt("Veuillez saisir votre nom : ");
        alert('Joueur : ' + nameUser + '  '  + 'Score : '+ score);
        cancelAnimationFrame(anime)
        HighScore(nameUser);
    }
    calculateFPSNormal();
    updateLabel( FPSNormal );
}


/*---------------------------------------------------------------------------
-----------------------------------Pause-------------------------------------
-----------------------------------------------------------------------------*/
const pause = () => {
    document.querySelector('#play-btn').style.display = 'block'
    document.querySelector('#pause-btn').style.display = 'none'
    document.querySelector('#restart-btn').style.display = 'block'
    
    alert('Votre partie est en pause !' + '\n' + '\n' +  'Pour relancer le jeu, cliquez sur OK, puis sur PLAY.')

    cancelAnimationFrame(anime)

}


/*---------------------------------------------------------------------------
--------------------------------High Scores----------------------------------
-----------------------------------------------------------------------------*/

// in progress

 
const HighScore = (nameUser) => {

    const highScores= JSON.parse(localStorage.getItem("highScores")) || [] ;
    const highScoresList = document.getElementById('highScores');


    highScoresList.innerHTML = highScores
        .map((Scores) => `<li> ${Scores.playername} : ${Scores.score} `)
        .join(' ');


    const MAX_HIGH_SCORES = 10

    const Scores = {
        playername : nameUser,
        score : score 
    }
    highScores.push(Scores);
    highScores.sort((a,b) =>  b.score - a.score)
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    
}

const showHighScores = () => {
    const highScores= JSON.parse(localStorage.getItem("highScores")) || [] ;
    const highScoresList = document.getElementById('highScores');
    
    highScoresList.innerHTML = highScores
        .map((Scores) => `<li> ${Scores.playername} : ${Scores.score} `)
        .join(' ');
}




