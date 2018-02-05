function isLetter(x) {
    return (/^[a-zA-Z]$/.test(x))
};

const Word = require("./Word.js").Word;
const inq = require("inquirer");
console.log("index.js is loaded");

const words = ["apple", "orange", "grapes", "banana", "peach", "watermelon", "cherry", "pineapple", "durian", "plum"]


let promptGuess = function(word){
    if (lives > 0) {
        inq.prompt([{
            type: "input",
            name: "attempt",
            message: `${word.concat()}\nyour guess (one letter please): `,
            validate: function validateGuess(name) {
                return isLetter(name) && name.length === 1;
            }
        }]).then(a => {
            let isCorrect = word.guess(a.attempt);
            console.log(isCorrect)
            if (!isCorrect) {
                lives--;
                wrongGuesses.push(a.attempt);
            }
            console.log("lives: "+lives);
            console.log("wrongGusses: " + wrongGuesses)
            console.log(word.concat());
            promptGuess(word)

        })
    } else {
        console.log("too many failed attempts")
    }
}
let wrongGuesses = [];
let lives = 5;

inq.prompt([{
    type: "confirm",
    name: "ready",
    message: "Are you ready for some Hangman?",
}, ]).then(function (confirmation) {
    if (confirmation.ready) {
        console.log("ready");
        let randomIndex = Math.floor(words.length * Math.random())
        let randomWord = new Word(words[randomIndex], false);
        words.splice(randomIndex,1)
        promptGuess(randomWord);
        // if (lives > 0) {
        //     inq.prompt([{
        //         type: "input",
        //         name: "attempt",
        //         message: `${randomWord.concat()}\nyour guess (one letter please): `,
        //         validate: function validateGuess(name) {
        //             return isLetter(name) && name.length === 1;
        //         }
        //     }]).then(a => {
        //         let isCorrect = randomWord.guess(a.attempt);
        //         console.log(isCorrect)
        //         if (!isCorrect) {
        //             lives--;
        //             wrongGuesses.push(a.attempt);
        //         }
        //         console.log("lives: "+lives);
        //         console.log("wrongGusses: " + wrongGuesses)
        //         console.log(randomWord.concat());

        //     })
        // }


    } else {
        console.log("Take a deep breath & get ready!")
    }
})




// var x = new Word("hello")
// console.log("x word is " + x.currentArr)
// console.log("x concat is " + x.concat())
// x.guess("l")
// x.guess("o")
// x.guess("1")
// console.log("x word is " + x.currentArr)
// console.log("x concat is " + x.concat())