
/**
 * 手写实现一个call函数
 */

Function.prototype._call = function (ctx) {
    const context = ctx || window;
    context.fn = this;
    const args = [...arguments].slice(1);
    const res = context.fn(...args);
    delete context.fn;
    return res;
}



/**
 * 手写实现一个apply函数
 */

Function.prototype._apply = function (ctx) {
    const context = ctx || window;
    context.fn = this;
    let res = null;
    const args = [...arguments].slice(1);
    if (args[0]) {
        res = context.fn(...args[0]);
    } else {
        context.fn();
    }
    delete context.fn;
    return res;
}


/**
 * 手写实现一个bind函数
 */

Function.prototype._bind = function (ctx) {
    const context = ctx || window;
    let _this = this;
    const args = [...arguments].slice(1);
    return function () {
        return _this._apply(context, args.concat(...arguments))
    };
}


function _new(func, ...args) {
    const target = {
        __proto__: func.prototype
    }
    const res = func.apply(target, args);
    if (typeof res === 'object' || typeof res === 'function') {
        return res;
    }
    return target;
}




var x = 1;
var obj = {
    x: 2,
    getValue: function (a, b, c) {
        return this.x + a + b + c;
    }
}

const getValue = obj.getValue;
const v = getValue._apply(obj, [1, 2, 3]);
console.log(v);