
function Dog() {
    this.foot = 4;
}

let husky = new Dog();

function Person() {
    
}
Person.prototype.name = '张三';
let personA = new Person();
let personB = new Person();
console.log(personA.name);
console.log(personB.name);

