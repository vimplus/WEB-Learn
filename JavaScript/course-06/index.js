
var person = {
    name: '小明',
    age: 18,
    job: 'WEB-Frontend'
}

console.log(person);

console.log(person.name + '同学今年'+ person.age +'岁，在北京做'+ person.job +'工作。');

var obj = {};
var objA = new Object();
var objB = Object.create(null);
console.log(obj)
console.log(objA)
console.log(objB)

obj.a = '123';
obj.b = '456';
obj['c'] = '789';
console.log(obj)

var obj1 = {
    job: 'web'
};
var obj2 = obj1;
console.log(obj1);
console.log(obj2);

obj2.name = '诗博';
obj2.job = 'h5';
console.log('obj1:', obj1);
console.log('obj2:', obj2);


var a = {
    x: 'xxx',
    y: 'yyy',
    z: 'zzz'
}
console.log('a:', a)
var b = {};

for (var key in a) {
    console.log('key:', key)
    console.log('a[key]:', a[key])
    debugger
    b[key] = a[key];
}


b.i = 'iii';

console.log('b:', b)
