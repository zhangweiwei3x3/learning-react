/**
 * anchor: zww
 * date: 2016-10-10
 */

'use strict';

/**
 * [throttle 函数节流]
 * @param  {Function} fn       回调函数
 * @param  {Number}   interval 延迟时间，默认值500
 * @return {Function}
 */
export function throttle(fn, interval) {
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

export const Util = {
    // 是不是手机
    isMobile: function () {
        let isMobile = /(Android|iPod|iPad|iPhone|Windows Phone|SymbianOS)/i.test(window.navigator.userAgent);

        this.isMobile = function () {
            return isMobile;
        };

        return isMobile;
    },

    // 获取样式
    getStyle: function (elem, attr) {
        if (window.getComputedStyle) { // 标准
            let view = elem.ownerDocument.defaultView;

            if (!view || !view.opener) {
                view = window;
            }

            return view.getComputedStyle(elem)[attr];
        } else if (document.documentElement.currentStyle) { // IE
            return elem.currentStyle[attr];
        }
    },

    // 获取 transition 动画结束事件
    getTransitionEndEvent: function () {
        let div = document.createElement('div'),
            TransitionEndEvent = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd otransitionend',
                transition: 'transitionend'
            },
            transitionEnd;

        for (let name in TransitionEndEvent) {
            if (typeof div.style[name] !== 'undefined') {
                transitionEnd = TransitionEndEvent[name];

                // 缓存 不用重新计算
                this.getTransitionEndEvent = function () {
                    return transitionEnd;
                };

                div = TransitionEndEvent = null;

                return transitionEnd;
            }
        }
    },

    // CSS 前缀
    vendorPropName: (function () {
        var cssPrefixes = ['Webkit', 'Moz', 'O', 'ms'],
            emptyStyle = document.createElement('div').style;

        return function (name) {
            if (name in emptyStyle) {
                return name;
            }

            var capName = name[0].toUpperCase() + name.slice(1),
                length = cssPrefixes.length;

            for (var i = 0; i < length; i++) {
                name = cssPrefixes[i] + capName;
                if (name in emptyStyle) {
                    return name;
                }
            }
        };
    })(),

    // 元素是否在 width height 这个矩形内部
    checkInRect: function (elem, width, height, offsetX, offsetY) {
        if (process.env.NODE_ENV !== 'production' && !elem || !width || !height) {
            throw new Error('elem, width, height 三个参数都不能为空');
        }

        const {top, right, bottom, left} = elem.getBoundingClientRect();

        if (bottom > offsetY && top < height + offsetY && right > offsetX && left < width + offsetX) {
            return true;
        }

        return false;
    },

    // 图片加载
    loadImg: function (imgDom, src, successCallback, errorCallback) {
        let img = new Image();

        img.onload = () => {
            imgDom.src = src;

            typeof successCallback === 'function' && successCallback(imgDom);

            img = img.onload = img.onerror = imgDom = src = successCallback = errorCallback = null;
        };
        img.onerror = () => {
            typeof errorCallback === 'function' && errorCallback(imgDom);

            img = img.onload = img.onerror = imgDom = src = successCallback = errorCallback = null;
        };
        img.src = src;
    }
    
};