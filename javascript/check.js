function checkLetterPosition(randomWord, promptResult) {
  var outputArr = [];
    for(var i = 0; i < randomWord.length; i++) {
      var letter = randomWord[i];
      if(letter === promptResult) {
        outputArr.push(letter);
      } else {
        outputArr.push("_");
      }
  }
  console.log(outputArr.join(" "));
  return outputArr.join(" ");
}

module.exports = checkLetterPosition;