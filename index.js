function isLetter(x){
	return(/^[a-zA-Z]$/.test(x))
};

const Word = require("./Word.js").Word;
const inq = require("inquirer");
console.log("index.js is loaded");

inq.prompt([
    {
        type: "input",
        name: "guess",
        message: "your guess (one letter please): ",
        validate: function validateGuess(name){
            return isLetter(name) && name.length === 1;
        }

    }
]).then(a=>console.log(a.guess))


// var x = new Word("hello")
// console.log("x word is " + x.currentArr)
// console.log("x concat is " + x.concat())
// x.guess("l")
// x.guess("o")
// x.guess("1")
// console.log("x word is " + x.currentArr)
// console.log("x concat is " + x.concat())