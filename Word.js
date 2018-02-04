let letterCons = require("./Letter.js").Letter

let y = new letterCons("b", false)


function Word(word) {
    this.word = word;
    this.letterArr = function () {
        let arr = this.word.split("");
        arr.forEach((letter, index) => {
                return arr[index] = new letterCons(letter, false)
        })
    console.log(arr[1])
}

}

var x = new Word("hello")
x.letterArr();