
// var arr = new Array();
var arr = [];
arr[0] = '小明';
arr[1] = '小军';
arr[2] = '小红';

console.log(arr);
console.log(arr[0]);
arr[2] = '小花';
console.log(arr[2]);

var arr2 = ['背包', '手提袋', '水果', '鞋子'];
console.log(arr2);


var arr3 = [123, ['a', 'b', 'c'], true, undefined, null, {a: 1}];

var arr4 = [[1, 2], [3, 4]];
console.log(arr4);

var arrA = ['a', 'b'];
console.log(arrA);
console.log(arrA.length);

arrA[2] = 'c';
console.log(arrA.length);

arrA[3] = ' ';

arrA[14] = 'd';
console.log(arrA[3]);
console.log(arrA.length);

arrA.length = 0;
console.log(arrA);


var myarr = ["小吉", "小雷", "小可", "小新", "月影"];
var numb = 4;
console.log("学号为 4 的是：" +   myarr[numb]  );



var myarray = new Array(50);
console.log(myarray);
myarray[3] = 'rrrrr';
myarray[99] = '大包';
console.log(myarray.length);


var a = '';
a = null;
console.log(a);

var myArr = [[0, 1, 2], [3, 4, 5]];
myArr[0][1] = 5;
console.log(myArr[0][1]);
