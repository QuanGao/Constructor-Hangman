const letterCons = require("./Letter.js").Letter

function Word(word) {
    this.getObjArr = function () {
        let arr = word.split("");
        arr.forEach((letter, index) => {
            return arr[index] = new letterCons(letter, false)
        });
        return arr
    };
    this.currentArr = this.getObjArr();
    this.concat = function () {
        return this.currentArr.reduce((a, b) => a + b)
    };
    this.guess = function (ltr) {
        let atLeastOneHit = false;
        this.currentArr.forEach((letter) => {
            letter.check(ltr);
            atLeastOneHit = atLeastOneHit || letter.guessed;
        });
        return atLeastOneHit;
    }
}

module.exports = {
    Word: Word
}

// var x = new Word("hello")
// console.log("x word is " + x.currentArr)
// console.log("x concat is " + x.concat())
// x.guess("l")
// x.guess("e")
// x.guess("1")
// console.log("x word is " + x.currentArr)
// console.log("x concat is " + x.concat())

