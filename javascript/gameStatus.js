var guessLetter = require("./hangman.js");

function checkGameStatus(outputArray, guessesLeft) {
  if(outputArray.indexOf("_") > -1 || guessesLeft > 0) {
    // guessLetter();
    guessLetter;
  } else {
    console.log("game ova");
  }
}


module.exports = checkGameStatus;