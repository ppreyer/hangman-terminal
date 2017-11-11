// Add node and file dependecies
var inquirer = require("inquirer");
var Word = require("./word.js");
var Letter = require("./letter.js");

// Create new instance of Word object to store options for users to guess from
var boardGames = new Word(
    ["sorry", "monopoly", "shootsandladders", "risk", "settlersofcatan",
        "stratego", "life", "chess", "scrabble"
    ]
);

// Create a randomly chosen word from above
var randomWord = boardGames.selectWord().toUpperCase();
// Create new instance of Letter object
var letterChanger = new Letter(randomWord);
// Display length of word chosen in "_" format
var placeholderWord = letterChanger.displayWordLength();
// Declare empty variable to store the main word that updates with each guess
var globalWord;

// Game object to store important data
var gameObject = {
    outputArr: [],
    turn: 0,
    guessesLeft: 8,
    guessList: [],
    guessInList: false,
};

// Main function to start game
function welcomePrompt() {
    // Call inquirer to display game rules
    inquirer.prompt([{
            type: "input",
            message: "Welcome to board game hangman! Your objective is to use the keyboard to guess letters in the title of a randomly chosen board game." + "\n" +
                "You have 8 total guesses each round. Please only guess one letter at a time" + "\n" +
                "Press enter to begin. Good luck!",
            name: "start"
        }
        // Callback function to display word to guess and invoke main game function guessLetter
    ]).then(function(answer) {
        console.log("Current board game:", placeholderWord);
        guessLetter();
    })
}

// Function to reset game after win/loss
function resetGame() {
    // Call inquirer and display reset game message
    inquirer.prompt([{
        type: "list",
        name: "reset",
        message: "Would you like to play again?",
        choices: ["yes", "no"]
        // Callback function to determine user's input
    }]).then(function(answer) {
        // if user wants to play...
        if (answer.reset === "yes") {
            // Rest gameObject and call appropriate functions
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

// function to check if user has already guessed letter. If not add to an array.
function addLetterToUserGuessArray(promptResult) {
    if (gameObject.guessList.indexOf(promptResult) > -1) {
        console.log("user guesses", gameObject.guessList);
        return;
    } else {
        gameObject.guessList.push(promptResult);
        console.log("List of your guesses so far: ", gameObject.guessList.join(", "));
    }
}

// Function checks if user's guess is in the array, if yes then alert user. If not check move to next function.
function checkIfUserGuessInList(prompResult) {
    if (gameObject.turn === 0) {
        gameObject.guessInList = false;
        return;
    } else if (gameObject.guessList.indexOf(prompResult) > -1) {
        console.log("You already guessed that letter silly goose. Guess again...");
        gameObject.guessInList = true;
        return;
    } else {
        gameObject.guessInList = false;
        return;
    }
}

// used to reset a gameobject property at the end of a turn
function changeUserGuessListFalse() {
    gameObject.guessInList = false;
}

// Display number of user guesses left if below 4
function displayUserGuessesLeft() {
    if (gameObject.guessesLeft < 4 && gameObject.guessesLeft > 0) {
        console.log(`You have ${gameObject.guessesLeft} guesses remaining! Choose your next letter wisely...`);
    } else {
        return;
    }
}

// Alert user if their guess is correct or not
function checkUserGuess(randomWord, promptResult) {
    if (randomWord.indexOf(promptResult) > -1) {
        console.log("CORRECT!");
        return true;
    } else {
        console.log("Try again ;(");
        gameObject.guessesLeft--;
        return false;
    }
}

// Create array with user's guess + "_" for one single turn to compare to the global word
function checkLetterPosition(randomWord, promptResult) {
    for (var i = 0; i < randomWord.length; i++) {
        var letter = randomWord[i];
        if (letter === promptResult) {
            gameObject.outputArr.push(letter);
        } else {
            gameObject.outputArr.push("_");
        }
    }
    // console.log("global outputArr", gameObject.outputArr);
    var outputArr = gameObject.outputArr;
    return outputArr;
}

// Compare user's guess to globalword to add user's correctly guessed letter
function compareArrays(outputArr, globalWord) {
    var placeholderArr = globalWord.split(" ");
    for (var i = 0; i < placeholderArr.length; i++) {
        if (gameObject.outputArr[i] !== "_") {
            placeholderArr[i] = gameObject.outputArr[i];
        } else {}
    }
    globalWord = placeholderArr.join(" ");
    return globalWord;
}

// Check to see which turn it is in the game
var checkTurn = function() {
    if (gameObject.turn === 0) {
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

// Main game function which is invoked to prompt a user to guess a letter
var guessLetter = function() {
    // console.log("Current Board Game:", randomWord);
    checkTurn();
    // if(!globalWord.indexOf("_") > -1 || guessesLeft < 0) {
    if (gameObject.guessesLeft < 1) {
        console.log("Oh wait....Sorry, but you don't have any guesses left.");
        console.log((`The word you failed to guess was: ${randomWord}`));
        resetGame();
    } else if (globalWord.indexOf("_") === -1) {
        console.log("You won city slicka'. You must be a board game master!");
        resetGame();
    } else {
        inquirer.prompt([{
            type: "input",
            name: "guessLetter",
            message: "Guess a letter!"
        }]).then(function(letter) {
            var upperLetter = letter.guessLetter.toUpperCase();
            checkIfUserGuessInList(upperLetter);
            addLetterToUserGuessArray(upperLetter);
            if (gameObject.guessInList === false) {
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

// Starts game
welcomePrompt();