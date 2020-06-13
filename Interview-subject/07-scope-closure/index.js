var a = 1;

if (true) {
    var x = 1;
    let y = 2;
}
console.log(x);
console.log(y);


try {
    var i = 8;
    let b = 6;
    console.log(i);
    console.log(b);
} catch (error) {
    
}

function fn() {
    var x = 666;
    return function () {
        console.log(x);
    }
}
var func = fn();
func()


function* gen() {
    yield 1;
    yield 2;
    yield 3;
}

var iterator = gen();

for (const key of iterator) {
    console.log(key)
}



var a = 1;
function foo() {
    console.log(a);
}

function bar() {
    var a = 2;
    foo()
}
bar();



function fn() {
    var x = 666;
    return function () {
        console.log(x);
    }
}
var func = fn();
func()

// 闭包其实就是一个绑定了执行环境的函数。
// 1.用来读取函数内部的变量； 
function fn() {
    var x = 666;
    return function () {
        console.log(x);
    }
}
var func = fn();
func()

// 2. 让变量常驻内存
function makeAdder(x) {
    return function (y) {
        return x + y;
    }
}
var add4 = makeAdder(4);

