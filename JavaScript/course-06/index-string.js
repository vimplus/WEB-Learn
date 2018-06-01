var message = "Hello World!";
var mlen = message.length;
console.log(mlen);


function Person() {
    this.eye = 2;
    this.head = 1;
    this.say = function (content) {
        console.log(content)
    }
}

var xm = new Person();
xm.job = 'web';
console.log(xm);
xm.say('妈妈，我要吃饭!');
xm.say('妈妈，我要尿尿!');


var myStr = "I like JavaScript!";
var myLen = myStr.length;
var myUp = myStr.toUpperCase();     // 转为大写字母
var myLow = myStr.toLowerCase();    // 转为小写字母

console.log("字符串长度：" + myLen);
console.log("大写转化后：" + myUp);
console.log("小写转化后：" + myLow);

var l = myStr.indexOf('a', 9);
var p = myStr.indexOf('x');
console.log(l)
console.log(p)

var s = myStr.charAt(5);
console.log(s)



var siteStr = "www.lxyweb.com";
var siteArr = siteStr.split('.');
console.log(siteArr);


var subStrVal = myStr.substring(2, 6);
console.log(subStrVal)

var subStrRet = myStr.substr(2, 4);
console.log(subStrRet)

var sliceStr = myStr.slice(2, 6);
console.log(sliceStr);

var now = new Date();
var mon = now.getMonth() + 1;
var m = now.getMinutes();
var minutes = m < 10 ? '0' + m : m;
console.log(mon)
console.log(m)
console.log(minutes)


var strVal = 'gsdafaddddddsssrddfwe';

function maxNum(str) {
    var obj = {};
    for (var i = 0; i < str.length; i++) {
        var key = str[i];
        if(!obj[key]) {
            obj[key] = 1;
        } else {
            obj[key]++;
        }
    }
    console.log(obj);
    var maxStr = '';
    var maxKey = 0;
    for (var key in obj) {
        if (obj[key] > maxKey) {
            maxStr = key;
            maxKey = obj[key];
        }
    }
    console.log({
        maxStr: maxStr,
        maxKey: maxKey,
    })
}

maxNum(strVal)
