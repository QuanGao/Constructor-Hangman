let letterCons = require("./Letter.js").Letter


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
        let objArr = this.currentArr;      
        return objArr.reduce((a,b)=>a+b)

    };
    this.guess = function (ltr) {
        let array = this.currentArr;   
        array.forEach((letter) => {           
            letter.check(ltr)
        
        });


 
    }

}

var x = new Word("hello")
x.guess("l")
x.guess("e")


console.log("x word is " + x.currentArr)
console.log("x concat is " + x.concat())
console.log("x objarr is " + x.getObjArr())
