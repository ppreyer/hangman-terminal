function Word(wordObj) {
  this.wordChoices = wordObj.wordChoices;
  this.selectedWord = wordObj.selectedWord;
  this.hello = function() {
    console.log('hello');
  }
  this.selectWord = function() {
    console.log(this.wordChoices[Math.floor(Math.random() * this.wordChoices.length)]);
  }
}



var boardGames = new Word({
  wordChoices: ["sorry", "monopoly", "shoots and ladders", "risk", "settlers of catan", "stratego", "life", "chess", "scrabble"],
  selectedWord: 'hello'
});

boardGames.selectWord();

// module.exports = word;
