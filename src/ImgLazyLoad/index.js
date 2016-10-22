/**
 * anchor: zww
 * time: 2016-10-14
 */

'use strict';

const {Component, PropTypes} = React;

import Utils from '../libs/Utils';
import throttle from '../libs/throttle';
import Img from '../Img';

export class ImgLazyLoad extends Component {
    render() {
        const {className, src} = this.props;

        return <Img {...this.props} data-src={src} className={ImgLazyLoad.class + (className ? ' ' + className : '')} />;
    }
}

ImgLazyLoad.class = 'img-lazy-load-' + Math.random().toString(36).slice(2, 5);
ImgLazyLoad.defaultProps = {
    scale: '16:9',
    lazy: true,
    isLoad: true
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
        Utils.loadImg(img, img.dataset.src, () => {
            img.classList.remove(ImgLazyLoad.class);
            img.classList.remove('img-load-before');

            this.imgsRemove(img);
        });
    }

    lazyLoad() {
        if (this.imgs.length === 0) {
            this.detachEvent();

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

            if (Utils.checkInRect(img, this.width, this.height, left, top)) {
                this.loadImg(img);
            }
        }
    }

    init() {
        const {eventTarget, offsetX, offsetY} = this.props;

        if (eventTarget === window) {
            this.target = window;
            this.width = window.innerHeight + offsetX;
            this.height = window.innerHeight + offsetY;
        } else {
            this.target = this.refs.lazyLoadWrap;
            this.width = parseFloat(Utils.getStyle(this.target, 'width')) + offsetX;
            this.height = parseFloat(Utils.getStyle(this.target, 'height')) + offsetY;
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
        eventType: PropTypes.oneOf(['scroll', 'touchmove']),
        eventTarget: PropTypes.oneOf([window, 'self']),
        offsetX: PropTypes.number,
        offsetY: PropTypes.number
    }; 
}