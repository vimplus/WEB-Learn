
// function sum(x) {
//     return function (y) {
//         return function (z) {
//             return x + y + z;
//         }
//     }
// }


// const val = sum(1)(2)(3); // 6

// console.log('val:', val)


function curry(fn, ...args) {
    if (args.length < fn.length) {
        debugger
        return function (...arguments) {
            debugger
            return curry(fn, ...args, ...arguments);
        }
    } else {
        debugger
        return fn(...args);
    }
}

function sumFn(a, b, c) {
    return a + b + c;
}

const sum = curry(sumFn);
debugger
console.log('sum:', sum(2)(3)(5))


