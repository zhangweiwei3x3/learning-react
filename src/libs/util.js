/**
 * anchor: zww
 * date: 2016-10-10
 */


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
    // isNumber 用于是否返回数字
    getStyle: function (elem, attr, isNumber) {
        let style;

        if (window.getComputedStyle) { // 标准
            // 防止 elem === document
            let view = (elem.ownerDocument || elem).defaultView;

            // jquery
            // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
            // IE throws on elements created in popups
            // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
            if (!view || !view.opener) {
                view = window;
            }

            style = window.getComputedStyle(elem)[attr];
        } else if (document.documentElement.currentStyle) { // IE
            style = elem.currentStyle[attr];
        }
        elem = null;

        if (isNumber) {
            return parseInt(style, 10);
        }

        return style;
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
    // 只有有部分在就返回 true
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
    loadImg: function (imgDom, src) {
        // 防止一个 img 连续加载两次 地址不一样的图片
        // 我们值保留最后一次的加载
        imgDom.__src__ = src;

        return new Promise((resolve, reject) => {
            let img = new Image();

            img.onload = (e) => {
                if (imgDom.__src__ === src) {
                    imgDom.src = src;
                    resolve(e);
                }
                img = img.onload = img.onerror = imgDom = src = null;
            };
            img.onerror = (e) => {
                if (imgDom.__src__ === src) {
                    reject(e);
                }
                img = img.onload = img.onerror = imgDom = src = null;
            };
            img.src = src;
        });
    },
    
    // 数组去重
    // 有key表示是复杂数组去重，根据数组中对象的属性key来去重
    arrUniq: function (arr, key) {
        if (!Array.isArray(arr) || arr.length < 2) {
            return arr;
        }

        // 简单数组去重
        if (!key) {
            return Array.from(new Set(arr));
        }

        // 复杂数组去重
        var obj = {},
            res = [];

        arr.forEach((item) => {
            if (!obj[item[key]]) {
                res.push(item);
                obj[item[key]] = true;
            }
        });

        return res;
    },

    // 获取滚动的容器
    // 如果是 document 就返回 window
    getScrollParent: function (elem) {
        let reg = /(scroll|auto)/i;

        while (true) {
            if (reg.test(Util.getStyle(elem, 'overflowY')) || reg.test(Util.getStyle(elem, 'overflowX'))) {
                break;
            }
            elem = elem.parentNode;
            if (elem.nodeName === '#document') {
                elem = window;
                break;
            }
        }

        return elem;
    }
};