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
import './style.scss';
import {Util} from '../../libs/Util';
const {Component, PropTypes} = React;

class Marquee extends Component {
    constructor(...args) {
        super(...args);

        this.transform = Util.vendorPropName('transform');
        this.transition = Util.vendorPropName('transition');
        this.index = 0;
        this.timer = null;

        this.transitionEnd = this.transitionEnd.bind(this);
    }

    autoPlay() {
        const {scrollTime} = this.props;

        this.index++;
        this.scroll(scrollTime, -1 * this.scrollDistance * this.index);
    }

    scroll(scrollTime, scrollDistance) {
        this.refs.marqueeContent.style[this.transition] = scrollTime + 'ms';
        this.refs.marqueeContent.style[this.transform] = `translate3d(0px, ${scrollDistance}px, 0px)`;
    }

    // transition 动画结束后事件
    transitionEnd() {
        if (this.index >= this.size) {
            this.index = 0;

            this.scroll(0, 0);
        }

        this.timer = setTimeout(this.autoPlay.bind(this), this.props.scrolldelay);
    }

    init() {
        const {children, scrolldelay} = this.props;

        if (this.timer) {
            clearTimeout(this.timer);
            this.detachTransition();
            this.refs.marqueeContent.removeAttribute('style');
        }

        if (!children || !children.length || children.length < 2) {
            return;
        }

        this.size = children.length;
        this.attachTransition();
        this.timer = setTimeout(this.autoPlay.bind(this), scrolldelay);
    }

    _renderChild() {
        const {children} = this.props;

        if (!children) {
            return null;
        }

        if (children.length > 1) {
            return children.concat(children[0]).map((item, index) => {
                return <div className="marquee-item" key={index}>
                    {item}
                </div>;
            });
        }

        return children;
    }

    attachTransition() {
        this.refs.marqueeContent.addEventListener(Util.getTransitionEndEvent(), this.transitionEnd, false);
    }

    detachTransition() {
        this.refs.marqueeContent.removeEventListener(Util.getTransitionEndEvent(), this.transitionEnd, false);
    }

    componentDidMount() {
        this.scrollDistance = parseFloat(Util.getStyle(this.refs.marquee, 'height'));

        this.init();
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.detachTransition();
        }
    }

    render() {
        return <div ref="marquee" className="marquee">
            <div ref="marqueeContent" className="marquee-content">
                {
                    this._renderChild()
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
    Marquee.propTypes = {
        scrollTime: PropTypes.number,
        scrolldelay: PropTypes.number
    };
}

export default Marquee;