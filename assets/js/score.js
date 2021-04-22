// const NO_OF_HIGH_SCORES = 10;

// function showHighScores() {
//     const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
//     const highScoreList = document.getElementById('highScores');
    
//     // nameUser = 'toto'
    
//     highScoreList.innerHTML = highScores
//         .map((score) => `<li>${score.score} - ${score.nameUser}`)
//         .join();
// }

// function checkHighScore(score) {
//     const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
//     const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;
  
//     if (score > lowestScore) {
//       const nameUser = prompt("Veuillez saisir votre nom : ");
//       const newScore = { score, nameUser };
//       saveHighScore(newScore, highScores);
//       showHighScores();
//     }
//   }

// function saveHighScore(score, highScores) {
//     highScores.push(score);
//     highScores.sort((a, b) => b.score - a.score);
//     highScores.splice(NO_OF_HIGH_SCORES);

//     localStorage.setItem('highScores', JSON.stringify(highScores));
// }
