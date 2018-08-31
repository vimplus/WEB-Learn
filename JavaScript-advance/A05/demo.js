// 1
(function () {
    var arr = [1, 1, '1', '2'];

    function unique(array) {
        var res = [];
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < res.length; j++) {
                if (array[i] === res[j]) {
                    break;
                }
            }
            if (j === res.length) {
                res.push(array[i])
            }
        }
        return res;
    }

    var ss = Date.now();
    console.log(unique(arr))
    console.log('----------ff time-consuming:', Date.now() - ss)
})()

// 2
(function () {
    var arr = [1, 1, '1', '2', 2, 2];

    function unique(array) {
        var res = [];
        for (var i = 0; i < array.length; i++) {
            var current = array[i];
            if (res.indexOf(current) === -1) {
                res.push(array[i]);
            }
        }
        return res;
    }

    var ss = Date.now();
    console.log(unique(arr))
    console.log('----------indexOf time-consuming:', Date.now() - ss)
})()


// 3
(function () {
    var arr = [1, 1, '1', '2', 2, 2];

    function unique(array) {
        var res = [];
        var sortArray = array.concat().sort();
        var seen = null;
        for (var i = 0; i < sortArray.length; i++) {
            var current = sortArray[i];
            if (!i || seen !== current) {
                res.push(current);
            }
            seen = current;
        }
        return res;
    }
    var ss = Date.now();
    console.log(unique(arr))
    console.log('----------Sort time-consuming:', Date.now() - ss)
})()


// 4
(function () {
    var arr = [1, 1, '1', '2', 2, 2];

    function unique(array) {

        return array.concat().sort().filter(function (item, index, array) {
            return !index || item !== array[index - 1];
        })
    }
    var ss = Date.now();
    console.log(unique(arr))
    console.log('----------filter time-consuming:', Date.now() - ss)
})()

// 5
(function () {
    var arr = [1, 1, '1', '2', 2, 2, {value: 1}, {value: 1}, {value: 2}];

    function unique(array) {
        var obj = {};
        return array.filter(function (item, index, array) {
            return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
        })
    }
    var ss = Date.now();
    console.log(unique(arr))
    console.log('----------Object time-consuming:', Date.now() - ss)
})()

// 6
(function () {
    var arr = [1, 1, '1', '2', 2, 2, {value: 1}, {value: 1}, {value: 2}];

    // function unique(array) {
    //     return Array.from(new Set(array))
    // }
    //
    // function unique(array) {
    //     return [...new Set(array)]
    // }

    var unique = (arr) => [...new Set(arr)];

    var ss = Date.now();
    console.log(unique(arr))
    console.log('----------Set time-consuming:', Date.now() - ss)
})()


// 7
var arr = [3,2,'2',3,5,6,8,3,5,2,{value: 1}, {value: 1}, {value: 2}, {}, {}, [],[]];
function unique(arr) {
    var tmp = [];
    var hash = {};
    for (var i = 0; i < arr.length; i++) {
        var key = typeof(arr[i]) + JSON.stringify(arr[i]);
        if(hash[key] !== 1) {
            tmp.push(arr[i])
            hash[key] = 1;
        }
    }
    return tmp;
}
console.log(unique(arr)); //[3, 2, "2", 5, 6, 8]