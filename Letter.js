function isLetter(x){
	return(/^[a-zA-Z]$/.test(x))
};
function Letter(char, guessed) {
    this.char = char;
    this.guessed = guessed;
    this.convert = function () {
        if (this.guessed) {
            return this.char;
        } else {
            return "-";
        };
    };
    this.check = function (guess) {
        if (!isLetter(guess)){
            console.log("only letters are allowed!")
        } else if (this.char === guess.toLowerCase()) {
            this.guessed = true;
        }
        console.log(this.guessed)
    }
}


