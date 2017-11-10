var guessesLeft = require("./game.js");

function checkUserGuess(randomWord, promptResult) {
  if(randomWord.indexOf(promptResult) > -1) {
    console.log("CORRECT!");
    return true;
  } else {
      console.log("Try again ;(");
      guessesLeft--;
      return false;
    }
}

module.exports = checkUserGuess;