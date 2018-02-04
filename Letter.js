function Letter(char, guessed) {
    this.char = char;
    this.guessed = false;
    this.convert = function () {
        if (this.guessed) {
            return this.char;
        } else {
            return "-";
        };
    };
    this.check = function (guess) {
        if (this.char === guess) {
            this.guessed = true;
        }
    }
}

let x = new Letter ("a")