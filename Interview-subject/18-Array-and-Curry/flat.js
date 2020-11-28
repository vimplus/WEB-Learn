const arr = [1, 2, [3, [4, [5]]]];  // [1, 2, 3, 4, 5s]

// const res = arr.flat(1);
// console.log('res:', res);

// 字符串过滤
function flat(arr) {
    let str = JSON.stringify(arr);
    str = str.replace(/(\[|\])/g, '');
    str = `[${str}]`;
    return JSON.parse(str);
}

// const flatten = arr => JSON.parse(`[${JSON.stringify(arr).replace(/(\[|\])/g, '')}]`);

// console.log('flatten:', flatten(arr));


// concat
// function flatten(arr) {
//     return !Array.isArray(arr) ? arr : [].concat.apply([], arr.map(flatten));
// }


// console.log('flatten:', flatten(arr));


// reduce
function flatten(arr) {
    return arr.reduce((a, b) => {
        return a.concat(Array.isArray(b) ? flatten(b) : b);
    }, []);
}

console.log('flatten:', flatten(arr));





