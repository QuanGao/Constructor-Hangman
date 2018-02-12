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
        if (this.char.toLowerCase() === guess.toLowerCase()) {
            this.guessed = true;
            return true;
        } else {
            return false;
        }     
    }
}

module.exports = Letter;
