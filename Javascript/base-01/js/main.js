// alert('Hello world!');


var y = "you";
var mysay = "I" + "love" + y; // = 后面是串表达式，mysay 值是字符串
var mynum = 12 + 6 * 2; // = 后面是数值表达式，mynum 值是数值
var mybool = mynum > 12; // = 后面是布尔表达式，mysay 值是布尔值

console.log('-----mysay:', mysay)
console.log('-----mynum:', mynum)
console.log('-----mybool:', mybool)

// document.write(mysay)
var num = 24;
// var myresult1 = ++num % 4 + 6 * 2; // myresult 是多少呢？
var myresult2 = num++ % 4 + 6 * 2; // myresult 是多少呢？


// console.log('-----myresult1:', myresult1)
console.log('-----myresult2:', myresult2)
console.log('-----num:', num)

var a = "6" + "6";
var b = 6 + 6;
var c = 6 + '23';
var d = String(6) + 6;
console.log('====a:', a)
console.log('====b:', b)
console.log('====c:', c)
console.log('====d:', d)
