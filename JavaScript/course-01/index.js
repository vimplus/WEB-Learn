
console.log('Hello 2018!');

var a = 1;
console.log(a);

var x = 'xyz';
console.log(x);

var name = 'Tom';
console.log(name + " is 'muggle'.");

var y = 'you';
var z = 'I' + ' ' + 'love ';
console.log(z + y);

var i = 12;
var k = 6;
console.log(i + k);
console.log(i - k);
console.log(i * k);
console.log(i / k);
console.log(i % k);


var numA = 24;
var numB = 24;
var myResult1 = ++numA % 4 + 6 * 2; // myresult 是多少呢？
var myResult2 = numB++ % 4 + 6 * 2; // myresult 是多少呢？
var myResult3 = numB++ % 4 + 6 * 2; // myresult 是多少呢？

console.log(myResult1)
console.log(numA)
console.log(myResult2)
console.log(myResult3)
console.log(numB)

var s = 1;
s = s + 2;
console.log(s);

var b = 6;
var c = '6';
console.log(c === b);

var age = 18;
if (age >= 14 && age <= 18) {
    console.log('青少年！')
}

var pay = 'alipay';
if (pay == 'WeChat' || pay == 'alipay') {
    console.log('本店支持微信或支付宝付款！');
}
