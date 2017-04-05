var myNum = [2, 3, 6, 7, 10, 11, '', 15, 30, 35, 50, 'apple', 60, 90, true, [1, 2]];

for (var i = 0; i < myNum.length; i++) {
    var val = myNum[i];
    if (typeof val === 'number') {
        if (val % 3 === 0 && val % 5 === 0) {
            console.log(val + '：能同时被3和5整除');
        } else if (val % 3 === 0) {
            console.log(val + '：只能被3整除');
        } else if (val % 5 === 0) {
            console.log(val + '：只能被5整除');
        } else {
            console.log(val)
        }
    } else if (typeof val != 'number') {
        console.log(false, '或' + val + '：不是Number型');
    } else {
        console.log(val)
    }
}
