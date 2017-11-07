function checkUserGuess(randomWord, promptResult) {
  if(randomWord.indexOf(promptResult) > -1) {
    console.log("YES");
  } else {
      console.log("Not Correct");
    }
}

module.exports = checkUserGuess;