var Word = function (wordArray) {
  this.wordChoices = wordArray;
  this.selectWord = function() {
    return this.wordChoices[Math.floor(Math.random() * this.wordChoices.length)];
  }
}

module.exports = Word;

// Export constructor to another file
// Use methods within constructor in another constructor