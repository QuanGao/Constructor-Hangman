function isLetter(x) {
    return (/^[a-zA-Z]$/.test(x))
};

const Word = require("./Word.js");
const inq = require("inquirer");
console.log("Welcome to hangman!");

const words = ["apple pie", "banana bread", "peach cobbler"]
let wrongGuesses = [];
let allGuesses = [];
let lives = 5;
let wins = 0;
let losses = 0;

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
            if (!isCorrect) {
                lives--;
                wrongGuesses.push(a.attempt);
                console.log(`Incorrect! Remaining guesses: ${lives}`)
            } else {
                console.log("correct!")
            }
            if(wrongGuesses.length>0){
                console.log("wrongGusses: " + wrongGuesses)
            }
            console.log(word.concat());
            if(word.answer === word.concat()){
                allGuesses = [];
                wrongGuesses = [];
                lives = 5;
                if(words.length > 0){
                    console.log("you got it! Next word!")
                    wins++;
                    playGame();
                } else {
                    console.log("you've finish all the words");
                    console.log(`wins: ${wins} | losses:${losses}`);

                }
                
            } else {
                promptGuess(word)
            }      

        })
    } else {
        console.log("You've used all the guesses");
        console.log(`The correct answer is ${word.answer}`);
        losses ++;
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
        