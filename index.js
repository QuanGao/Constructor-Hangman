function isLetter(x) {
    return (/^[a-zA-Z]$/.test(x))
};

const Word = require("./Word.js");
const inq = require("inquirer");
console.log("\nWelcome to hangman!\n");

const easyWords = ["apple pie", "banana bread", "peach cobbler", "blueberry muffin", "strawberry shortcake"]
const mediumWords = ["Daenerys Targaryen", "Cersei Lannister", "Arya Stark", "Khal Drogo", "Margaery Tyrell"]
const hardWords = ["Riddikulus", "Obliviate", "Sectumsempra", "Avada Kedavra", "Alohomora"]
let wrongGuesses = [];
let allGuesses = [];
let lives = 5;
let wins = 0;
let losses = 0;

let promptGuess = function(word,words){
    if (lives > 0) {
        inq.prompt([{
            type: "input",
            name: "attempt",
            message: `Guess a letter!`,
            validate: function validateGuess(name) {
                return isLetter(name) && name.length === 1 && allGuesses.indexOf(name.toLowerCase()) === -1;
            }
        }]).then(a => {
            let attempt = a.attempt.toLowerCase()
            let isCorrect = word.guess(attempt);
            allGuesses.push(attempt)
            if (!isCorrect) {
                lives--;
                wrongGuesses.push(a.attempt.toLowerCase());
                console.log(`\nIncorrect! Remaining guesses: ${lives}`)
            } else {
                console.log("\ncorrect!")
            }
            if(wrongGuesses.length>0){
                console.log("\nwrongGusses: " + wrongGuesses)
            }
            console.log(`\n${word.concat()}\n`);
            if(word.answer === word.concat()){
                wins++;
                console.log("You got it!")
                nextWord(words);            
            } else {
                promptGuess(word,words)
            }      

        })
    } else {
        losses ++;
        console.log(`You lose! The word is ${word.answer}.`)
        nextWord(words);    
    }
}

let nextWord = function(words){
    allGuesses = [];
    wrongGuesses = [];
    lives = 5;
    if(words.length > 0){
        console.log("\nNext word!")
        playGame(words);
    } else {
        console.log("\nyou've finish all the words");
        console.log(`\nwins: ${wins} | losses:${losses}\n`);
        startGame()
    }
}

let playGame = function(words){   
    let randomIndex = Math.floor(words.length * Math.random())
    let randomWord = new Word(words[randomIndex], false);
    words.splice(randomIndex,1)
    console.log(`\n${randomWord.concat()}\n`);
    promptGuess(randomWord,words);    
}

let startGame = function(){
    wins = 0;
    losses = 0;
    inq.prompt([{
        type: "list",
        name: "choice",
        message: "What level would you like to play?",
        choices: ["easy - 5 fruit pastries", "medium - 5 Game of Thrones characters", "hard - 5 Harry Potter magic spells", "cancel"]
    }]).then(a => {
        switch(a.choice){
            case "easy - 5 fruit pastries":
                playGame(easyWords);
                break;
            case "medium - 5 Game of Thrones characters":
                playGame(mediumWords)
                break;
            case "hard - 5 Harry Potter magic spells":
                playGame(hardWords);
                break;
            default:
                console.log("\nNext Time!\n")
                process.exit(-1)      
        }
    })

}
startGame();

        