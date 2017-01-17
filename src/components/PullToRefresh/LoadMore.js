/**
 * 上拉加载
 * 
 * anchor: zww
 * date: 2017-01-16
 *
 *  initLoad：初始时是否加载数据
 *  hasNext：有没有下一页数据
 *  isFill：未满屏是否加载数据
 *  offset：距离底部多长距离开始加载
 *  tips：上拉加载的提示信息 [<span>正在加载...</span>, '已无更多']
 *  onLoad：加载函数 promise 对象
 *  onLoadEnd：加载函数结束后的回调函数
 * 
 */
import {Util} from '../../libs/Util';
const {Component, PropTypes} = React;

export default class LoadMore extends Component {
    constructor(...args) {
        super(...args);

        this.loading = false;
        this.domUpdate = false;
        this.hasRemoveScrollEvent = false; // 用于判断是否已经取消监听scroll函数
        this.scroll = this.scroll.bind(this);
    }

    // 加载结束的回调
    loadEnd(isSuccess) {
        const {onLoadEnd} = this.props;

        this.loading = false;
        typeof onLoadEnd === 'function' && onLoadEnd(isSuccess);
        if (this.domUpdate) {
            this.fill();
        }
    }

    // 加载数据
    load() {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.domUpdate = false;
        let res = this.props.onLoad();

        if (res) {
            res.then(this.loadEnd.bind(this, true), this.loadEnd.bind(this, false));
        }
    }

    // 滚动监听事件
    scroll() {
        if (this.props.isLoading || this.loading) {
            return;
        }
        const {scrollTop, scrollHeight} = this.scrollPaneDOM;

        if (scrollTop + this.clientHeight + this.offset >= scrollHeight) {
            this.load();
        }
    }

    // 未满屏继续加载更多
    fill() {
        if (this.loading) {
            return;
        }
        const {isFill, hasNext} = this.props;

        if (isFill && hasNext && this.clientHeight > Util.getStyle(this.refs.loadMoreContent, 'height', true)) {
            this.load();
        }
    }

    componentDidMount() {
        this.scrollPane = Util.getScrollPane(this.refs.loadMore);
        this.scrollPaneDOM = this.scrollPane;
        if (this.scrollPaneDOM === window) {
            this.scrollPaneDOM = document.body;
        }
        this.clientHeight = this.scrollPaneDOM.clientHeight;
        const {offset, initLoad} = this.props, 
            {loadMoreTips} = this.refs,
            img = loadMoreTips.getElementsByTagName('img')[0];

        // 上拉加载的提示信息 如果是图片
        if (img) {
            img.onload = () => {
                this.offset = Util.getStyle(loadMoreTips, 'height', true) + offset;
            };
        }
        this.offset = Util.getStyle(loadMoreTips, 'height', true) + offset;
        this.scrollPane.addEventListener('scroll', this.scroll, false);

        if (initLoad) {
            this.load();
        } else {
            this.fill();
        }
    }

    componentDidUpdate() {
        const {hasNext} = this.props;

        // 删除或重新绑定scroll监听事件
        // 监听事件已删除
        if (this.hasRemoveScrollEvent) {
            // 有更多，需要重新监听
            if (hasNext) {
                this.scrollPane.addEventListener('scroll', this.scroll, false);
                this.hasRemoveScrollEvent = false;
            }

        // 监听事件未删除
        } else {
            // 没有更多，删除监听事件
            if (!hasNext) {
                this.scrollPane.removeEventListener('scroll', this.scroll, false);
                this.hasRemoveScrollEvent = true;
            }
        }
        this.domUpdate = true;
        // 未满屏需要加载
        this.fill();
    }

    componentWillUnmount() {
        !this.hasRemoveScrollEvent && this.scrollPane.removeEventListener('scroll', this.scroll, false);
        this.touchParent = null;
    }

    render() {
        const {className, children, hasNext, tips} = this.props;

        return <div ref="loadMore" className={`load-more${className ? ' ' + className : ''}`}>
            <div ref="loadMoreContent" className="load-more-content">{children}</div>
            <div ref="loadMoreTips" className={`load-more-tips${hasNext ? '' : ' no-more'}`}>{hasNext ? tips[0] : tips[1]}</div>
        </div>;
    }
}

LoadMore.defaultProps = {
    initLoad: false,
    hasNext: true,
    isFill: true,
    offset: 50,
    tips: ['正在加载...', '已无更多']
};
if (process.env.NODE_ENV !== 'production') {
    LoadMore.PropTypes = {
        // 初始时是否加载数据
        initLoad: PropTypes.bool,
        // 有没有下一页数据
        hasNext: PropTypes.bool.isRequired,
        // 未满屏是否加载数据
        isFill: PropTypes.bool,
        // 距离底部多长距离开始加载
        offset: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
        // 上拉加载的提示信息 ['正在加载...', '已无更多']
        tips: PropTypes.array,
        // 加载函数 promise 对象
        onLoad: PropTypes.func.isRequired,
        // 加载函数结束后的回调函数
        onLoadEnd: PropTypes.func
    }; 
}