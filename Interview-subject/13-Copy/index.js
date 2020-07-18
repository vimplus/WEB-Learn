let x = 1;
let obj = {
    name: 'abc'
}

let y = x;
let newObj = obj;

y = 2;
newObj.name = 'xyz';

console.log(x);
console.log(obj.name);


function shadowClone(originObj = {}) {
    let copy = Array.isArray(originObj) ? [] : {};

    for (const key in originObj) {
        if (originObj.hasOwnProperty(key)) {
            copy[key] = originObj[key];
        }
    }
    return copy;
}


let objA = {
    name: 'aaa',
    obj: {
        str: 'sssss'
    }
}
let objB = shadowClone(objA);


function deepClone(originObj = {}) {
    if (originObj === null) return null;
    if (typeof originObj !== 'object') return originObj;
    if (originObj.constructor === Date) return new Date(originObj);
    if (originObj.constructor === RegExp) return new RegExp(originObj);

    let copy = Array.isArray(originObj) ? [] : {};
    for (const key in originObj) {
        if (originObj.hasOwnProperty(key)) {
            copy[key] = originObj[key] instanceof Object ? deepClone(originObj[key]) : originObj[key];
        }
    }
    return copy;
}


let objA = {
    name: 'aaa',
    obj: {
        str: 'sssss'
    }
}
let objC = deepClone(objA);


// slice(0)/concat
[1, 2, 3, 8]
// 如果数组的值都是基本类型的数据，那就可以深拷贝，否则只进行浅拷贝；

// Object.create()/Object.assign()
let obj = {
    name: 'xx',
    age: 18,
    info: {
        addr: '王家村'
    },
    getName: function () {

    }
}


// ES6解构
let x = {name: 'xxx', age: 18};
let y = {...x};
let objD = {...obj};


// let objData = JSON.parse(JSON.stringify(obj));