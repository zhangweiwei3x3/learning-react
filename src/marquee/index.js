/**
 * 头条 向上滚动 (待完善)
 * 
 * anchor: zww
 * date: 2016-10-11
 *
 * scrollTime: 滚动一条记录的时间（number string）
 * scrolldelay: 滚动一条记录后的暂停时间 string）
 *
 */

'use strict';

const {Component, PropTypes} = React;

import {Util} from '../libs/Util';

class Marquee extends Component {
    constructor(...args) {
        super(...args);

        this.transform = Util.vendorPropName('transform');
        this.transition = Util.vendorPropName('transition');
        this.index = 0;
        this.opacity = 0;
        this.timer = null;

        this.transitionEnd = this.transitionEnd.bind(this);
    }

    scroll() {
        const {scrollTime} = this.props;

        this.index++;
        if (this.index >= this.size) {
            this.animate(0, this.scrollDistance);
            this.index = 0;

            setTimeout(() => {
                this.animate(scrollTime, 0);
            });
        } else {
            this.animate(scrollTime, -1 * this.scrollDistance * this.index);
        }
    }

    animate(scrollTime, scrollDistance) {
        this.refs.marqueeContent.style[this.transition] = scrollTime + 'ms';
        this.refs.marqueeContent.style[this.transform] = `translateY(${scrollDistance}px)`;
        this.refs.marqueeContent.style.opacity = this.opacity;
    }

    // transition 动画结束后事件
    transitionEnd() {
        if (this.index % 2 === 0) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.opacity = this.opacity ? 0 : 1;
                this.scroll();
            }, this.props.scrolldelay);
        } else {
            this.opacity = this.opacity ? 0 : 1;
            this.scroll();
        }
    }

    componentDidMount() {
        const {children, scrolldelay} = this.props;
        let marqueeItems = this.refs.marqueeContent.children;
        
        this.scrollDistance = parseFloat(Util.getStyle(this.refs.marquee, 'height'));
        this.size = children.length * 2;

        for (let i = marqueeItems.length; i--;) {
            marqueeItems[i].style.marginBottom = this.scrollDistance + 'px';
        }

        this.refs.marqueeContent.addEventListener(Util.getTransitionEndEvent(), this.transitionEnd, false);
        this.timer = setTimeout(this.scroll.bind(this), scrolldelay);
    }

    omponentWillUnmount() {
        this.refs.marqueeContent.removeEventListener(Util.getTransitionEndEvent(), this.transitionEnd, false);
    }

    render() {
        const {children} = this.props;

        return <div ref="marquee" className="marquee">
            <div ref="marqueeContent" className="marquee-content">
                {
                    children.map((item, index) => {
                        return <div className="marquee-item" key={index}>
                            {item}
                        </div>;
                    })
                }
            </div>
        </div>;
    }
}

Marquee.defaultProps = {
    scrollTime: 500, // 滚动一条记录的时间
    scrolldelay: 3000 // 滚动一条记录后的暂停时间
};
if (process.env.NODE_ENV !== 'production') {
    Marquee.PropTypes = {
        // 滚动一条记录的时间
        scrollTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        // 滚动一条记录后的暂停时间
        scrolldelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }; 
}

export default Marquee;