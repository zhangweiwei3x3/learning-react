/**
 * 下拉刷新
 * 
 * anchor: zww
 * date: 2017-01-13
 *
 *  threshold：允许的误差 一般不用传
 *  offset：下拉最大偏移量，实际下拉距离等于 this.height + offset
 *  duration：动画执行时间
 *  tips：下拉刷新的提示信息  [<span>下拉刷新...</span>, '松开更新...', '正在加载...']
 *  onRefresh：下拉刷新函数，promise 对象
 *  onRefreshEnd: 下拉结束后的回调函数 onRefreshEnd(isSuccess) isSuccess 用于判断是成功还是失败
 */
import './style.scss';
import {Util} from '../../libs/Util';
const {Component, PropTypes} = React;

export default class Refresh extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            // 当前是什么状态
            // ['下拉刷新...', '松开更新...', '正在加载...']
            status: 0
        };
        // tips 只有一个 全部都一样 [下拉刷新] -> [下拉刷新, 下拉刷新, 下拉刷新]
        // tips 有两个 [下拉刷新, 正在加载] -> [下拉刷新, 下拉刷新, 正在加载]
        const {tips, threshold, duration} = this.props,
            length = tips.length;

        if (length === 1) {
            this.tips = [tips[0], tips[0], tips[0]];
        } else if (length === 2) {
            this.tips = [tips[0], tips[0], tips[1]];
        } else {
            this.tips = tips;
        }

        this.threshold = +threshold;
        this.duration = +duration;
        this.isStart = false;
        this.refreshing = false;
        this.startPageY = 0;
        this.endPageY = 0;
        this.transform = Util.vendorPropName('transform');
        this.transition = Util.vendorPropName('transition');
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    animate(offset = 0, duration = 0) {
        this.touchParent.style[this.transition] = duration + 'ms';
        this.touchParent.style[this.transform] = `translate3d(0px, ${offset}px, 0px)`;
    }

    // 刷新结束的回调
    refreshEnd(isSuccess) {
        this.refreshing = false;
        this.animate(0, this.duration);
        this.timer && clearTimeout(this.timer);
        setTimeout(() => {
            this.setState({status: 0});
        }, this.duration);
        const {onRefreshEnd} = this.props;

        typeof onRefreshEnd === 'function' && onRefreshEnd(isSuccess);
    }

    onTouchStart(e) {
        if (!this.props.isLoading && !this.refreshing && this.scrollParent.scrollTop <= this.threshold) {
            this.isStart = true;
            this.isMoveing = false;
            this.startPageY = e.touches[0].pageY;
        }
    }

    onTouchMove(e) {
        if (!this.isStart) {
            return;
        }
        this.endPageY = e.touches[0].pageY;
        let diffY = Math.min(this.endPageY - this.startPageY, this.maxMove);

        if (diffY > this.height && this.state.status != 1) {
            this.setState({status: 1});
            this.refreshing = true;
        }

        this.animate(Math.max(diffY, 0));
    }

    onTouchEnd() {
        if (!this.isStart) {
            return;
        }
        this.isStart = false;
        // 不刷新
        if (!this.refreshing) {
            return this.animate(0, this.duration);
        }

        this.animate(this.height, this.duration);
        this.timer = setTimeout(() => {
            this.setState({status: 2});
        }, this.duration);
        let res = this.props.onRefresh();

        if (res) {
            res.then(this.refreshEnd.bind(this, true), this.refreshEnd.bind(this, false));
        }
    }

    componentDidMount() {
        let {refresh} = this.refs,
            img = refresh.getElementsByTagName('img')[0];

        this.touchParent = refresh.parentNode;
        this.scrollParent = Util.getScrollPane(refresh);
        if (this.scrollParent === window) {
            this.scrollParent = document.body;
        }
        this.touchParent.addEventListener('touchstart', this.onTouchStart, false);
        this.touchParent.addEventListener('touchmove', this.onTouchMove, false);
        this.touchParent.addEventListener('touchend', this.onTouchEnd, false);
        this.touchParent.addEventListener('touchcancel', this.onTouchEnd, false);
        // 下拉刷新的提示信息 如果是图片
        if (img) {
            img.onload = () => {
                this.height = Util.getStyle(refresh, 'height', true);
                refresh.style.top = -this.height + 'px';
                this.maxMove = +this.props.offset + this.height;
            };
        }
        this.height = Util.getStyle(refresh, 'height', true);
        refresh.style.top = -this.height + 'px';
        this.maxMove = +this.props.offset + this.height;
    }

    componentWillUnmount() {
        this.touchParent.removeEventListener('touchstart', this.onTouchStart, false);
        this.touchParent.removeEventListener('touchmove', this.onTouchMove, false);
        this.touchParent.removeEventListener('touchend', this.onTouchEnd, false);
        this.touchParent.removeEventListener('touchcancel', this.onTouchEnd, false);
        this.touchParent.removeAttribute('style');
        this.touchParent = null;
    }

    render() {
        const {className} = this.props,
            {status} = this.state;

        return <div ref="refresh" className={`refresh step${status + 1}${className ? ' ' + className : ''}`}>
            {this.tips[status]}
        </div>;
    }
}

Refresh.defaultProps = {
    threshold: 5,
    offset: 50,
    duration: 300,
    tips: ['下拉刷新...', '松开更新...', '正在加载...']
};
if (process.env.NODE_ENV !== 'production') {
    Refresh.PropTypes = {
        // 允许的误差
        threshold: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
        // 下拉最大偏移量
        // 下拉最大的距离 + this.height + offset
        offset: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
        // 动画执行时间
        duration: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
        // 下拉刷新的提示信息 ['下拉刷新...', '松开更新...', '正在加载...']
        tips: PropTypes.array,
        // 下拉刷新事件 promise 对象
        onRefresh: PropTypes.func.isRequired,
        // 下拉刷新事件结束的回调函数
        onRefreshEnd: PropTypes.func
    }; 
}