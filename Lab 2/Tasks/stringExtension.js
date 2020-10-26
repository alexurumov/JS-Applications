(() => {

    String.prototype.ensureStart = function (str) {
        let result = '' + this;
        if (!this.includes(str)) {
            result = str.concat(this);
        };
        return result;
    };

    String.prototype.ensureEnd = function (str) {
        let result = '' + this;
        if (!this.includes(str)) {
            result = this.concat(str);
        };
        return result;
    };

    String.prototype.isEmpty = function () {
        let result = '' + this;
        if (!result) {
            return true;
        }

        return false;
    };

    String.prototype.truncate = function (n) {
        let result = '' + this;
        if (result.length < n) {
            return result;
        }

        if (n < 4) {
            return ('.').repeat(n);
        }

        let space = result.lastIndexOf(' ');

        if (space > -1) {
            return result.slice(0, space) + '...';
        } else {
            return result.slice(0, n - 3) + '...';
        }
    };

    // String.format = function(str, ...params) { 
    //     let paramBracket = str.indexOf('{');
    //     let paramIndex = str[paramBracket + 1];
    //     if (paramIndex > 0 || paramIndex < params.length) {
    //         str.replace()
    //     }
    // }

    // let str = 'my string';
    // str = str.ensureStart('my');
    // console.log(str);
    // str = str.ensureStart('hello ');
    // console.log(str);
    // str = str.truncate(16);
    // console.log(str);
    // str = str.truncate(14);
    // console.log(str);
    // str = str.truncate(8);
    // console.log(str);
    // str = str.truncate(4);
    // console.log(str);
    // str = str.truncate(2);
    // console.log(str);


})();