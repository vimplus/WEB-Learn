var bar = {
    myName: '小明',
    printName: function () {
        console.log(myName);
    }
}

function foo() {
    let  myName = '小红';
    return bar.printName;
}

let myName = '张三';
let _printName = foo();

_printName();
bar.printName();

// 全局上下文中的this、函数中的this、eval中的this；


let bar = {
    myName: '小明',
    test: 1
}

function foo() {
    this.myName = '小花';
}

foo.call(bar);
console.log(bar);
console.log(myName);



var bar = {
    myName: '小明',
    printName: function () {
        console.log(this.myName);
    }
}

bar.printName()


function CreateObject() {
    this.name = '李四';
}

var obj = new CreateObject();


var a = 1;
var obj = {
    a: 2,
    func: function () {
        (() => {
            console.log(this.a)
        })()
    }
}


var x = 10;
var o = {
    x: 20,
    func: () => {
        console.log(this.x)
    }
}
o.func()


var name = 'Windows';
var object = {
    name: 'Mac',
    getName: function () {
        return function () {
            return this.name;
        }
    }
}
object.getName()()





