/**
 * 实现一个节流函数
 * 思路：在规定的时间内只触发一次
 */
function throtte(func, delay) {
    // 利用闭包保存时间
    let prevTime = Date.now();
    return function () {
        let nowTime = Date.now();
        let context = this;
        if (nowTime - prevTime >= delay) {
            func.apply(context, arguments);
            prevTime = Date.now();
        }
    }
}

function fn() {
    console.log('节流')
}
window.addEventListener('scroll', throttle(fn, 1000)) 

/**
 * 实现一个防抖函数
 * 思路：在规定的时间内未触发第二次，则执行
 */
function debounce(func, delay) {
    // 利用闭包储存定时器
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        // 在规定的时间内再次触发则先清除定时器，重设定时器
        clearTimeout(timer);
        timer = setTimeout(function () {
            func.apply(context, args)
        }, delay);
    }
}

function fn() {
    console.log('防抖')
}
window.addEventListener('scroll', debounce(fn, 1000));