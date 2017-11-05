
var a;
console.log(a)
a = 'abc';

function fun() {
    var a;
    console.log(a)
    a = 'xyz';
}

fun()


let b = 'aaa';
console.log(b)
b = 'bbb';
console.log(b)

const c = 'ccc';
console.log(c)
/*c = 'c222';
console.log(b)*/

const obj = {name: 'txboy'}
// obj.name = '乐潇游';

// obj = ['乐潇游']
obj.job = 'frontend developer'
console.log(obj)


if(true) {
    let x = 'xxxxx';
} else {
    let x = 'ccccc';
    console.log(x)
}


var val = 'Hello';
var str = `${val} world!`;
console.log(str);
var js = 'JavaScript.';

var html = `
    <div>${str}</div>
    <p>I learn ${js}</p>
`

console.log(html)


function doubleVal(x, n = 2) {
    return x * n;
}

var d = doubleVal(3);
console.log(d)



setTimeout(() => {
    console.log('setTimeout')
}, 1000)




// ES6
/*var o = {
    s1: 0,
    timer: function () {
    //   this.s1 = 0;
      console.log(this.s1)
      console.log(this)
      setInterval(() => {
          this.s1++;
          console.log(this.s1)
      }, 1000);
    }
}

o.timer()*/

// 等同于ES5
/*var o = {
    timer: function () {
      this.s1 = 0;
      var _this = this;
      console.log(this.s1)
      setInterval(function () {
          _this.s1++;
          console.log(_this.s1)
      }, 1000);
    }
}

o.timer()*/


var data = {
    x: 1,
    y: 2,
    z: 3
}

let { x, y, z, k } = data;
console.log('--------x:', x)
console.log('--------y:', y)
console.log('--------z:', z)
console.log('--------k:', k)



var s = {...data}
console.log('------------s:', s)
