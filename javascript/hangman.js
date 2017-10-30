var inquirer = require("inquirer");
var wordObject = require("./word.js");

inquirer.prompt([

{
  type: "input",
  name: "userIntro",
  message: "Welcome to the official terminal hangman game. Press enter to get started!"
},

{
  type: "input",
  name: "userInstructions",
  message: 
  `Well I guess you're ready to play. Here's the deal - use your keyboard 
  to guess letters in the selected word. If you guess correctly, the letter will
  appear in the word. If not, you will lose a guess. You have 10 guesses so choose wisely.
  Good luck!`
}

  ]).then(function (answers) {
    console.log(answers.userIntro);
    console.log(answers.userInstructions);
    wordObject.word.selectWord();
});