const letterCons = require("./Letter.js")

function Word(word) {
    this.answer = word;
    this.getObjArr = function () {
        let arr = word.split("");
        arr.forEach((letter, index) => {
            if(letter != " "){
                return arr[index] = new letterCons(letter, false);
            }
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
            if(letter !=" "){
                letter.check(ltr);
                atLeastOneHit = atLeastOneHit || letter.check(ltr);
            }        
        });
        return atLeastOneHit;
    }
}

module.exports = Word;



