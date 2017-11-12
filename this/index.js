
function identify() {
    return this.name.toUpperCase();
}


function sayHello() {
    var greeting = "Hello, I'm " + identify.call(this);
    return greeting;
}

var personA = {
    name: 'txboy'
}

// var r1 = identify(personA)
var r2 = identify.call(personA)
// console.log(r1)
console.log(r2)

var v1 = sayHello.call(personA);
console.log(v1)



function fn(num) {
    console.log('fn:', num);
    // count用于记录fn的被调用次数
    this.count++;
}

fn.count = 0;

for (var i = 0; i < 10; i++) {
    if (i > 5) {
        fn( i );
    }
}


console.log(fn.count)


function fnA() {
    var a = 3;
    console.log(this.a)
}

var a = 6;
fnA()



function foo() {
    console.log(this.a)
}

var obj = {
    a: 5,
    foo: foo
}

obj.foo()

var obj2 = {
    a: 9,
    foo: foo
}

var obj1 = {
    a: 32,
    obj2: obj2
}

obj1.obj2.foo();


function Person(name) {
    this.name = name;
}


var p = new Person('乐潇游');
console.log(p.name)
