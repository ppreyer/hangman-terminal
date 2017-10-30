function Letter(letterObj) {
  this.word = letterObj.word;
  this.displayWordLength = function() {
    if(this.word.length > 0) {
      var blankWordArr = [];
      for(var i = 0; i < this.word.length; i++) {
        var letter = this.word[i];
        blankWordArr.push("_");
      }
      console.log(blankWordArr.join(" "));
    }
  }
}


var letter = new Letter ({
  word : 'hello',
})

letter.displayWordLength();



// function Word(wordObj) {
//   this.wordChoices = wordObj.wordChoices;
//   this.selectedWord = wordObj.selectedWord;
//   this.selectWord = function() {
//     console.log(this.wordChoices[Math.floor(Math.random() * this.wordChoices.length)]);
//   }
// }


// var boardGames = new Word({
//   wordChoices: ["sorry", "monopoly", "shoots and ladders", "risk", "settlers of catan", "stratego", "life", "chess", "scrabble"],
//   selectedWord: ''
// });