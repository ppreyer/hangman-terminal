var Letter = function (randomWord) {
  this.word = randomWord,
  this.displayWordLength = function() {
    if(this.word.length > 0) {
      var blankWordArr = [];
      for(var i = 0; i < this.word.length; i++) {
        var letter = this.word[i];
        blankWordArr.push("_");
      }
      var blankWord = blankWordArr.join(" ");
      console.log(blankWord);
    }
  }
}

module.exports = Letter;

// var letter = new Letter(['life', 'is', 'hard']);
// letter.displayWordLength();

