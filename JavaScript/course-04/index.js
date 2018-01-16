// var a = 1;
// var b = 3;
// var sum = a + b;
// console.log(sum)
//
//
// var x = 3;
// var y = 5;
// var z = x + y;
// console.log(z)

var s = 'xxxx';

function add(a, b) {
    var sum = a + b;
    return sum;
}


var ret = add(1, 3);
console.log('ret:', ret)
var ret2 = add(3, 5);
console.log('ret2:', ret2)
var ret3 = add(6, 9);
console.log('ret3:', ret3)
var ret4 = add(10, 15);
// alert(ret4)


// 闭包
function parent() {
    var n = 123;
    function child() {
        console.log(n)
        return n;
    }
    return child();
}

parent();


var addA = null;
function outer() {
    var a = 999;
    addA = function () {
        a++;
    }
    function inner() {
        console.log(a);
    }
    return inner;
}

var res = outer();
res();
addA();
res();


function makeAdder(x) {
    return function (y) {
        return x + y;
    }
}

var add6 = makeAdder(6);
console.log(add6(3));


function once() {
    var flag = true;
    return function () {
        if (flag) {
            console.log(1);
            flag = false;
        } else {
            console.log(2);
            flag = true;
        }
    }
}

var runOnce = once();
runOnce();
runOnce();
runOnce();
runOnce();
runOnce();
runOnce();
runOnce();
runOnce();

var mark = true;
function run() {
    if (mark) {
        console.log(1);
        mark = false;
    } else {
        console.log(2);
        mark = true;
    }
}
console.log('----------------------------')
run();
run();
run();
run();
run();
run();
run();
run();
