function getFibonator() {

    let n = 0;

    function fib(n) {
        if (n <= 1) {
            return 1;
        }            
        return fib(n - 2) + fib(n - 1);
    }

    return function() {
        return fib(n++);
    };

}

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13
