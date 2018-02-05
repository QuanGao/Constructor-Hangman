function isLetter(x){
	return(/^[a-zA-Z]$/.test(x))
};

const Word = require("./Word.js").Word;
const inq = require("inquirer");
console.log("index.js is loaded");

const words = ["apple", "orange", "grapes", "banana", "peach", "watermelon", "cherry","pineapple","durian", "plum"]
// let chooseWord = function(){ 
//      let randomIndex = Math.floor(words.length * Math.random())
//      let randomWord = new Word (words[randomIndex], false);  
//      words.splice(randomIndex,1)
// }


let wrongGuesses = [];
let lives = 5;
inq.prompt([
    {
        type: "confirm",
        name: "ready",
        message: "Are you ready for some Hangman?",
    },
]).then(function(confirmation){
    if(confirmation.ready){
        console.log("ready");
        let randomIndex = Math.floor(words.length * Math.random())
        let randomWord = new Word (words[randomIndex], false);
        
        inq.prompt([
            {
                type: "input",
                name: "guess",
                message: `${randomWord.concat()}\nyour guess (one letter please): `,
                validate: function validateGuess(name){
                    return isLetter(name) && name.length === 1;
                }
            }
]).then(a=>console.log(a.guess))


    } else{console.log("Take a deep breath & get ready!")}
})




// var x = new Word("hello")
// console.log("x word is " + x.currentArr)
// console.log("x concat is " + x.concat())
// x.guess("l")
// x.guess("o")
// x.guess("1")
// console.log("x word is " + x.currentArr)
// console.log("x concat is " + x.concat())