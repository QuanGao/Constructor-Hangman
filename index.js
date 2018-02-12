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
            let isCorrect = word.guess(a.attempt.toLowerCase());
            allGuesses.push(a.attempt)
            if (!isCorrect) {
                lives--;
                wrongGuesses.push(a.attempt.toLowerCase());
                console.log(`Incorrect! Remaining guesses: ${lives}`)
            } else {
                console.log("correct!")
            }
            if(wrongGuesses.length>0){
                console.log("wrongGusses: " + wrongGuesses)
            }
            console.log(`${word.concat()}\n`);
            if(word.answer === word.concat()){
                wins++;
                reset();
                if(words.length > 0){
                    console.log("you got it! Next word!")
                    playGame(words);
                } else {
                    console.log("you've finish all the words");
                    console.log(`wins: ${wins} | losses:${losses}`);
                    startGame()
                }
                
            } else {
                promptGuess(word,words)
            }      

        })
    } else {
        losses ++;
        reset();
        if(words.length > 0){
            console.log(`You lose! The word is ${word.answer}. Next word!`);
            playGame(words);
        } else {
            console.log("you've finish all the words");
            console.log(`wins: ${wins} | losses:${losses}`);
            startGame()

        }
      
    }
}

let reset = function(){
    allGuesses = [];
    wrongGuesses = [];
    lives = 5;
}

let playGame = function(words){   
    let randomIndex = Math.floor(words.length * Math.random())
    let randomWord = new Word(words[randomIndex], false);
    words.splice(randomIndex,1)
    console.log(`${randomWord.concat()}\n`);
    promptGuess(randomWord,words);    
}

let startGame = function(){
    inq.prompt([{
        type: "list",
        name: "choice",
        message: "What level would you like to play?",
        choices: ["easy - 5 fruit pastries", "medium - 5 Game of Thrones characters", "hard - 5 Harry Potter magic spells", "cancel"]
    }]).then(a => {
        let level = a.choice;
        console.log(level)
        if(level === "easy - 5 fruit pastries"){
            playGame(easyWords);
        } else if (level === "medium - 5 Game of Thrones characters"){
            playGame(mediumWords)
        } else if (level === "hard - 5 Harry Potter magic spells"){
            playGame(hardWords);
        } else {
            console.log("next time!")
            process.exit(-1)
        }
    })

}
startGame();

        