function isLetter(x) {
    return (/^[a-zA-Z]$/.test(x))
};

const Word = require("./Word.js");
const inq = require("inquirer");
console.log("index.js is loaded");

const words = ["apple", "banana", "peech"]
let wrongGuesses = [];
let allGuesses = [];
let lives = 5;

let promptGuess = function(word){
    if (lives > 0) {
        inq.prompt([{
            type: "input",
            name: "attempt",
            message: `Guess a letter!`,
            validate: function validateGuess(name) {
                return isLetter(name) && name.length === 1 && allGuesses.indexOf(name) === -1;
            }
        }]).then(a => {
            let isCorrect = word.guess(a.attempt);
            allGuesses.push(a.attempt)
            console.log(isCorrect)
            if (!isCorrect) {
                lives--;
                wrongGuesses.push(a.attempt);
                console.log("Incorrect!");
                console.log(`Remaining guesses: ${lives}`)
            } else {
                console.log("correct!")
            }
            console.log("wrongGusses: " + wrongGuesses)
            console.log(word.concat());
            if(word.answer === word.concat()){
                allGuesses = [];
                wrongGuesses = [];
                lives = 5;
                if(words.length > 0){
                    console.log("you got it! Next word!")
                    playGame();
                } else {
                    console.log("you've finish all the words")
                }
                
            } else {
                promptGuess(word)
            }      

        })
    } else {
        console.log("You've used all the guesses")
        console.log(`The word is ${word.answer}`)
    }
}

let playGame = function(){   
    let randomIndex = Math.floor(words.length * Math.random())
    let randomWord = new Word(words[randomIndex], false);
    words.splice(randomIndex,1)
    console.log(randomWord.concat());
    promptGuess(randomWord);    
}
playGame();
        
    



// if(round === 0){
//     inq.prompt([{
//         type: "confirm",
//         name: "ready",
//         message: "Are you ready for some Hangman?",
//     }, ]).then(function (confirmation) {
// })



// var x = new Word("hello")
// console.log("x word is " + x.currentArr)
// console.log("x concat is " + x.concat())
// x.guess("l")
// x.guess("o")
// x.guess("1")
// console.log("x word is " + x.currentArr)
// console.log("x concat is " + x.concat())