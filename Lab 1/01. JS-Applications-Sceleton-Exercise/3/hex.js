class Hex {

    constructor(value) {
        this.value = Number(value);
    }

    valueOf() {
        return this.value;
    }

    toString() {
        return `0x${this.value.toString(16).toUpperCase()}`;
    }

    plus(number) {
        if (number instanceof Hex) {
            this.value += number.valueOf();
        } else {
            this.value += Number(number);
        }
        return new Hex(this.value);
    }

    minus(number) {
        if (number instanceof Hex) {
            this.value -= number.valueOf();
        } else {
            this.value -= Number(number);
        }
        return new Hex(this.value);
    }

    parse(string) {
        return parseInt(string, 16);
    }

}

let FF = new Hex(255);
console.log(FF.parse('0xF'));
