
var arrA = ['a', 'b', 'c'];
var arrB = ['x', 'y', 'z'];

var arrC = arrA.concat(arrB);
console.log(arrC)
console.log(arrA)
console.log(arrB)

var siteUrl = ['www', 'thinktxt', 'com'];
var host = siteUrl.join('.');
console.log(host)

var arrD = arrA.slice(0);
console.log(arrD)

var a = arrA.splice(0, 0, 'k');
console.log(a)
console.log(arrA)

var x = arrB.reverse();
console.log(x)
console.log(arrB)

var arrBox = ['d', 'k', 'a', 'b', 'p', 'w', 'e'];
var arrNum = [23, 5, 65, 12, 33, 6, 100];
arrBox.sort();
arrNum.sort();
console.log(arrBox)
console.log(arrNum)

function sortNum(a, b) {
    return a - b;
}

arrNum.sort(sortNum);
console.log(arrNum)
