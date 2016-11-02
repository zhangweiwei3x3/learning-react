/**
 * 图片懒加载
 * 
 * anchor: zww
 * date: 2016-10-14
 *
 *  eventType:  监听事件类型（'scroll', 'touchmove'）
 *  eventTarget: 滚动容器（window, 'self', 'parent'）
 *  offsetX: 开始加载时的左边界值（string, number）
 *  offsetY: 开始加载时的下边界值（string, number）
 *  
 */

'use strict';

const {Component, PropTypes} = React;

import {Util, throttle} from '../libs/Util';
import Img from '../Img';
const reqImg = require.context('../Img');

export class ImgLazyLoad extends Component {
    render() {
        const {className, src, type, scale, deafultImg, deafultImgName, isLazy, initLoad} = this.props;

        return <Img src={src} type={type} scale={scale} deafultImg={deafultImg} deafultImgName={deafultImgName} isLazy={isLazy} initLoad={initLoad} data-src={src} className={(!initLoad ? ImgLazyLoad.class : '') + (className ? ' ' + className : '')} />;
    }
}
ImgLazyLoad.class = 'img-lazy-load-' + Math.random().toString(36).slice(2, 5);
// 属性说明见 Img 组件
ImgLazyLoad.defaultProps = {
    initLoad: false // ImgLazyLoadWrap 自己加载 img 不需要在Img 组件里加载
};

export class ImgLazyLoadWrap extends Component {
    constructor(...args) {
        super(...args);

        this.resizeEvent = throttle(this.resizeEvent.bind(this));
        this.lazyLoad = throttle(this.lazyLoad.bind(this));
    }

    imgsRemove(img) {
        for (let i = 0; i < this.imgs.length; i++) {
            if (this.imgs[i] === img) {
                this.imgs.splice(i, 1);

                break;
            }
        }
    }

    loadImg(img) {
        Util.loadImg(img, img.dataset.src, () => {
            img.classList.remove('img-load-before');

            this.imgsRemove(img);
        }, () => {
            let deafultImg = img.getAttribute('deafultImg'),
                currentSrc;

            if (deafultImg) {
                currentSrc = deafultImg;
            } else {
                let scale = img.getAttribute('scale'),
                    deafultImgName = img.getAttribute('deafultImgName'),
                    type = img.getAttribute('type'),
                    currentSrcName = `./default-${scale ? scale.replace(':', 'x') : ''}${deafultImgName ? '-' + deafultImgName : ''}.${type}`;
                
                currentSrc = reqImg(currentSrcName);

                if (process.env.NODE_ENV !== 'production' && !currentSrc) {
                    throw new Error(`${currentSrcName}不存在`);
                }
            }

            img.src = currentSrc;
        });
    }

    lazyLoad() {
        if (this.imgs.length === 0) {
            return;
        }
        let left = 0,
            top = 0;

        if (this.props.eventTarget !== window) {
            let bound = this.target.getBoundingClientRect();

            left = bound.left;
            top = bound.top;
        }

        for (let i = 0; i < this.imgs.length; i++) {
            let img = this.imgs[i];

            if (Util.checkInRect(img, this.width, this.height, left, top)) {
                this.loadImg(img);
            }
        }
    }

    init() {
        let {eventTarget, offsetX, offsetY} = this.props;
        
        offsetX = +offsetX;
        offsetY = +offsetY;

        if (eventTarget === window) {
            this.target = window;
            this.width = window.innerHeight + offsetX;
            this.height = window.innerHeight + offsetY;
        } else if (eventTarget === 'self') {
            this.target = this.refs.lazyLoadWrap;
            this.width = parseFloat(Util.getStyle(this.target, 'width')) + offsetX;
            this.height = parseFloat(Util.getStyle(this.target, 'height')) + offsetY;
        } else {
            this.target = this.refs.lazyLoadWrap.parentNode;
            this.width = parseFloat(Util.getStyle(this.target, 'width')) + offsetX;
            this.height = parseFloat(Util.getStyle(this.target, 'height')) + offsetY;
        }
    }

    resizeEvent() {
        this.init();
    }

    attachEvent() {
        this.target.addEventListener('resize', this.resizeEvent, false);
        this.target.addEventListener(this.props.eventType, this.lazyLoad, false);
    }
    detachEvent() {
        this.target.removeEventListener('resize', this.resizeEvent, false);
        this.target.removeEventListener(this.props.eventType, this.lazyLoad, false);
    }

    componentDidMount() {
        this.imgs = Array.from(this.refs.lazyLoadWrap.querySelectorAll('.' + ImgLazyLoad.class));
        this.init();
        this.attachEvent();
        this.lazyLoad();
    }

    componentDidUpdate() {
        this.imgs = Array.from(this.refs.lazyLoadWrap.querySelectorAll('.' + ImgLazyLoad.class)).filter((item) => {
            return item.src !== item.dataset.src;
        });
        this.lazyLoad();
    }

    componentWillUnmount() {
        this.detachEvent();
    }

    render() {
        return <div ref="lazyLoadWrap" {...this.props}>
            {this.props.children}
        </div>;
    }
}

ImgLazyLoadWrap.defaultProps = {
    eventType: 'scroll',
    eventTarget: window,
    offsetX: 0,
    offsetY: 0
};
if (process.env.NODE_ENV !== 'production') {
    ImgLazyLoadWrap.PropTypes = {
        // 监听事件类型
        eventType: PropTypes.oneOf(['scroll', 'touchmove']),
        // 滚动容器
        eventTarget: PropTypes.oneOf([window, 'self', 'parent']),
        // 开始加载时的左边界值
        offsetX: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
        // 开始加载时的下边界值
        offsetY: PropTypes.oneOf([PropTypes.number, PropTypes.string])
    }; 
}