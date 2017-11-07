var inquirer = require("inquirer");
var Word = require("./word.js");
var Letter = require("./letter.js");
var checkUserGuess = require("./guess.js");

var boardGames = new Word(
  ["sorry", "monopoly", "shoots and ladders", "risk", "settlers of catan", "stratego", "life", "chess", "scrabble"]
);

var randomWord = boardGames.selectWord();
var word = new Letter(randomWord);

inquirer.prompt([
  {
    type: "input",
    name: "guessLetter",
    message: "Guess a letter!"
  }
]).then(function(letter) {
  console.log(randomWord);
  word.displayWordLength();
  checkUserGuess(randomWord, letter.guessLetter);
  // Limit user to one guess
  // If letter is in string then replace in correct spot
  // If letter is not in string then remove one from guess and alert user
})























// inquirer.prompt([

// {
//   type: "input",
//   name: "userIntro",
//   message: "Welcome to the official terminal hangman game. Press enter to get started!"
// },

// {
//   type: "input",
//   name: "userInstructions",
//   message: 
//   `Well I guess you're ready to play. Here's the deal - use your keyboard 
//   to guess letters in the selected word. If you guess correctly, the letter will
//   appear in the word. If not, you will lose a guess. You have 10 guesses so choose wisely.
//   Good luck!`
// }

//   ]).then(function (answers) {
//     console.log(answers.userIntro);
//     console.log(answers.userInstructions);
// });