/**
 * anchor: zww
 * time: 2016-10-08
 * 
 * [throttle 函数节流]
 * @param  {Function} fn       回调函数
 * @param  {Number}   interval 延迟时间，默认值500
 * @return {Function}
 */
'use strict';

function throttle(fn, interval) {
    var timer, // 定时器
        firstTime = true; // 是否是第一次使用

    return function () {
        var args = arguments,
            self = this;

        // 第一次使用
        if (firstTime) {
            fn.apply(self, args);

            return firstTime = false;
        }

        // 定时器还存在
        if (timer) {
            return false;
        }

        // 延迟执行
        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            fn.apply(self, args);
        }, interval || 500);
    };
}

export default throttle;