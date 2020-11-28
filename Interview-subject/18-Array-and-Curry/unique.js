const arr = [1, 2, 2, 3, 4, 5, 5];

// 方法一：hash
function unique(arr) {
    const res = [];
    const hash = new Map();

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (hash.has(item)) {
            hash.set(item, true);
        } else {
            hash.set(item, false);
            res.push(item)
        }
    }
    return res;
}

console.log('uniqueA:', unique(arr));

// 方法二：includes
function uniqueB(arr) {
    const res = []; // m
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (!res.includes(item)) {
            res.push(item);
        }
    }
    return res;
}

console.log('uniqueB:', uniqueB(arr));


// 方法三：Set
function uniqueC(arr) {
    return Array.from(new Set(arr))
}
