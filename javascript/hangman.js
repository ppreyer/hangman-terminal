var inquirer = require("inquirer");
var Word = require("./word.js");
var Letter = require("./letter.js");
// var checkUserGuess = require("./guess.js");

// var checkLetterPosition = require("./check.js");

// var checkGameStatus = require("./gameStatus.js");
// var guessesLeft = require("./game.js");

var boardGames = new Word(
  ["sorry", "monopoly", "shootsandladders", "risk", "settlersofcatan",
   "stratego", "life", "chess", "scrabble"]
);

var randomWord = boardGames.selectWord().toUpperCase();
var letterChanger = new Letter(randomWord);
// console.log(randomWord);
var placeholderWord = letterChanger.displayWordLength();
// console.log("placeholderWord", placeholderWord);
var globalWord;

var gameObject = {
  outputArr: [],
  turn: 0,
  guessesLeft: 8,
  guessList: [],
  guessInList: false
};

function welcomePrompt() {
  inquirer.prompt([
  {
    type: "input",
    message: "Welcome to board game hangman! Your objective is to use the keyboard to guess letters in the title of a randomly chosen board game." + "\n" 
    + "You have 8 total guesses each round. Please only guess one letter at a time" + "\n" 
    + "Press enter to begin. Good luck!",
    name: "start"
  }

    ]).then(function(answer) {
      console.log("Current board game:", placeholderWord);
      guessLetter();
    })
}

function resetGame() {

  inquirer.prompt([
    {
      type: "list",
      name: "reset",
      message: "Would you like to play again?",
      choices: ["yes", "no"]
    }
  ]).then(function(answer) {
    if(answer.reset === "yes") {
      gameObject.outputArr = [];
      gameObject.turn = 0;
      gameObject.guessesLeft = 10;
      gameObject.guessList = [];
      randomWord = boardGames.selectWord();
      letterChanger = new Letter(randomWord);
      placeholderWord = letterChanger.displayWordLength();
      globalWord;
      console.log(placeholderWord);
      guessLetter();
    }
  })
};

function addLetterToUserGuessArray(promptResult) {
  if(gameObject.guessList.indexOf(promptResult) > -1) {
    console.log("user guesses", gameObject.guessList);
    return;
  } else {
      gameObject.guessList.push(promptResult);
      console.log("List of your guesses so far: ", gameObject.guessList.join(", "));
    }
  }    

function checkIfUserGuessInList(prompResult) {
  if(gameObject.turn === 0) {
    gameObject.guessInList = false;
    return;
  } else if(gameObject.guessList.indexOf(prompResult) > -1) {
    console.log("You already guessed that letter silly goose. Guess again...");
    gameObject.guessInList = true;
    return;
  } else {
    gameObject.guessInList = false;
    return;
  }
}

function displayUserGuessesLeft() {
  if(gameObject.guessesLeft < 4 && gameObject.guessesLeft > 0) {
    console.log(`You have ${gameObject.guessesLeft} guesses remaining! Choose your next letter wisely...`);
  } else {
    return;
  }
}

function changeUserGuessListFalse() {
  gameObject.guessInList = false;
}

function checkUserGuess(randomWord, promptResult) {
  if(randomWord.indexOf(promptResult) > -1) {
    console.log("CORRECT!");
    return true;
  } else {
      console.log("Try again ;(");
      gameObject.guessesLeft--;
      return false;
    }
}

function checkLetterPosition(randomWord, promptResult) {
    for(var i = 0; i < randomWord.length; i++) {
      var letter = randomWord[i];
      if(letter === promptResult) {
        gameObject.outputArr.push(letter);
      } else {
        gameObject.outputArr.push("_");
      }
  }
  // console.log("global outputArr", gameObject.outputArr);
  var outputArr = gameObject.outputArr;
  return outputArr;
  }

function compareArrays(outputArr, globalWord) {
  var placeholderArr = globalWord.split(" ");
  // console.log("placeholder array", placeholderArr);
    for(var i=0; i < placeholderArr.length; i++) {
      if(gameObject.outputArr[i] !== "_") {
        placeholderArr[i] = gameObject.outputArr[i];
      } else {
        }
    }
  // console.log("place", placeholderArr);
  globalWord = placeholderArr.join(" ");
  return globalWord;
}

var checkTurn = function() {
  if(gameObject.turn === 0) {
    globalWord = placeholderWord; 
    // console.log("initial globalword", globalWord);
    // console.log("init outputarr", gameObject.outputArr);
  } else {
    // console.log("outarr", gameObject.outputArr)
    globalWord = compareArrays(gameObject.outputArr, globalWord);
    gameObject.outputArr = [];
    // console.log ("string outarr", gameObject.outputArr);
    console.log("Current board game: ", globalWord);
    return;
    }
}
// checkGameStatus(outputArr, guessesLeft);
var guessLetter = function() {
// console.log("Current Board Game:", randomWord);
checkTurn();
// if(!globalWord.indexOf("_") > -1 || guessesLeft < 0) {
  if(gameObject.guessesLeft < 1) {
    console.log("Oh wait....Sorry, but you don't have any guesses left.");
    console.log((`The word you failed to guess was: ${randomWord}`));
    resetGame();
  } else if(globalWord.indexOf("_") === -1) {
    console.log("You won city slicka'. You must be a board game master!");
    resetGame();
  } else {
inquirer.prompt([
  {
    type: "input",
    name: "guessLetter",
    message: "Guess a letter!"
  }
]).then(function(letter) {
  var upperLetter = letter.guessLetter.toUpperCase();
  checkIfUserGuessInList(upperLetter);  
  addLetterToUserGuessArray(upperLetter);
  if(gameObject.guessInList === false) {
    checkUserGuess(randomWord, upperLetter);
    checkLetterPosition(randomWord, upperLetter);
    compareArrays(gameObject.outputArr, globalWord);
    gameObject.turn++;
    changeUserGuessListFalse();
    displayUserGuessesLeft();
    guessLetter();
  } else {
      checkLetterPosition(randomWord, upperLetter);
      compareArrays(gameObject.outputArr, globalWord);
      gameObject.turn++;
      changeUserGuessListFalse();
      displayUserGuessesLeft();
      guessLetter();
   }
})

  } 
}

welcomePrompt();
// guessLetter();



















