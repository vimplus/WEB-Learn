
// 原型链继承
function Parent(addr) {
    this.lastName = '王';
    this.addr = addr;
}

function Child(name) {
    this.name = name;
}

Child.prototype = new Parent('王家村');
Child.prototype.getName = function () {
    return this.lastName + this.name;
}

const person = new Child('小明');
person.getName();


// 构造函数继承
function Parent(addr) {
    this.lastName = '李';
    this.addr = addr;
}

function Child(name) {
    Parent.call(this, '李家村');
    this.name = name;
    this.getName = function () {
        return this.lastName + this.name;
    }
}

const person = new Child('小强');
person.getName();


// 组合式继承(构造函数+原型链)
function Animal(name, color) {
    this.name = name;
    this.color = color;
    this.foot = 4;
}

function Dog(name, color, age) {
    Animal.call(this, name, color);
    this.age = age;
}

Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

const dog = new Dog('小黑', '黑色', 3);


// 原型式继承（手写Object.create）
function object(parent) {
    function F() {}
    F.prototype = parent;
    return new F();
}

const person = {
    name: '张三',
    friends: ['小明', '小强']
}

const personA = object(person);
personA.name = '小华';
personA.friends.push('小军');

const personB = object(person);
personB.name = '阿珍';
personB.friends.push('小红');


// 寄生式（建立在原型式继承的基础上，调用object）
function object(parent) {
    function F() {}
    F.prototype = parent;
    return new F();
}
function creatAnother(parent) {
    const clone = object(parent);
    clone.sayHello = function () {
        console.log('Hello')
    }
    return clone;
}

const person = {
    name: '张三',
    friends: ['小明', '小强']
}

const personA = creatAnother(person);
personA.name = '小华';
personA.sayHello();


// 寄生组合式继承(推荐)
function inheritPrototype(parent, child) {
    const prototype = Object.create(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}
function Parent() {
    this.name = 'txboy';
    this.sayHello = function (str) {
        console.log(str);
    }
}

function Child() {
    Parent.call(this);
    this.type = 'child';
}

// Child.prototype = Object.create(Parent.prototype);
// Child.prototype.constructor = Child;
inheritPrototype(Parent, Child);

const person = new Child();
person.sayHello('Hello');


// 混入方式继承多个对象
function ParentClass() {
    
}
function OtherParentClass() {
    
}
function Child() {
    ParentClass.call(this);
    OtherParentClass.call(this);
}

Child.prototype = Object.create(ParentClass.prototype);
Object.assign(Child.prototype, OtherParentClass.prototype);

Child.prototype.constructor = Child;
Child.prototype.addMethod = function () {
    
};


// ES6中的Class的继承(extends)
class Parent {
    constructor(lastName) {
        this.lastName = lastName;
    }
}

class Child extends Parent {
    constructor(lastName, name, age) {
        super(lastName);
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.lastName + this.name;
    }
}

const person = new Child('张', '小明', 18);
person.getName();
