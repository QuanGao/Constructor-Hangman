function Letter(char, guessed) {
    this.char = char;
    this.guessed = guessed;
    this.toString = function () {
        if (this.guessed) {
            return this.char;
        } else {
            return "-";
        };
    };
    this.check = function (guess) {
        if (this.char === guess.toLowerCase()) {
            this.guessed = true;
        }
        // console.log(this.guessed)
    }
}

module.exports = {
    Letter: Letter
}
