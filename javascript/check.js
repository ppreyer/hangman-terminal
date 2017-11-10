var outputArr = require("./hangman.js");
var placeholderWord = require("./hangman.js");

function checkLetterPosition(randomWord, promptResult) {
    for(var i = 0; i < randomWord.length; i++) {
      var letter = randomWord[i];
      if(letter === promptResult) {
        outputArr.push(letter);
      } else {
        outputArr.push("_");
      }
  }
  console.log("global outputArr", outputArr);
  return outputArr;
  }

function compareArrays(outputArr, placeholderWord) {
  var placeholderArr = placeholderWord.split(" ");
  // console.log("arr before loop", placeholderArr);
    for(var i=0; i < placeholderArr.length; i++) {
      if(outputArr[i] !== "_") {
        placeholderArr[i] = outputArr[i];
      } else {
        }
    }  
  // console.log("placeholder array", placeholderArr);
  return placeholderArr;
}

checkLetterPosition("rad", "a");
compareArrays(outputArr, placeholderWord);
module.exports = checkLetterPosition;
// module.exports = compareArrays;