var eat = 'noodles';

if (eat == 'rice') {
    console.log('吃米饭！');
} else {
    console.log('吃面条！')
}

var age = 25;

if (age < 14) {
    console.log('你是儿童！');
} else if (age > 14 && age < 18) {
    console.log('你是青少年！');
} else if (age > 18) {
    console.log('你已经成年了！可以看暴走漫画了！');
}


var gender = 0; // 1 男； 2 女； 3：保密
switch (gender) {
    case 1:
        console.log('男');
        break;
    case 2:
        console.log('女');
        break;
    case 3:
        console.log('保密');
        break;
    default:
        console.log('难道你是春哥！？');
}


var eatArr = ['ios', 'web', 'android'];
// for循环
for (var i = 0; i < eatArr.length; i++) {
    switch (eatArr[i]) {
        case 'ios':
        case 'android':
            console.log('APP');
            break;
        case 'web':
            console.log('这是网页！');
            break;
        default:
            console.log('未知平台！');
    }
}

// while循环
// var i = 0;
// while (i < eatArr.length) {
//     switch (eatArr[i]) {
//         case 'ios':
//         case 'android':
//             console.log('APP');
//             break;
//         case 'web':
//             console.log('这是网页！');
//             break;
//         default:
//             console.log('未知平台！');
//     }
//     i++;
// }

var num = 1;
var a = null;
do {
    document.write('数值为:' + num + '</br>');
    num++;
} while (num <= 5);
