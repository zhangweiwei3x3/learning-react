/**
 * 下拉刷新上拉加载
 * 
 * anchor: zww
 * date: 2017-01-16
 *
 *  threshold：允许的误差 一般不用传
 *  offset：下拉最大偏移量，实际下拉距离等于 this.height + offset
 *  duration：动画执行时间
 *  tips：下拉刷新的提示信息  [<span>下拉刷新...</span>, '松开更新...', '正在加载...']
 *  onRefresh：下拉刷新函数，promise对象
 *  onRefreshEnd: 下拉结束后的回调函数 onRefreshEnd(isSuccess) isSuccess 用于判断是成功还是失败
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
import './style.scss';
import {Util} from '../../libs/Util';
import Refresh from './Refresh';
import LoadMore from './LoadMore';
const {Component, PropTypes} = React;
const {findDOMNode} = ReactDOM;

export default class PullToRefresh extends Component {
    constructor(...args) {
        super(...args);

        this.isLoading = false;
        this.isRefreshing = false;
    }

    onRefresh() {
        if (this.isLoading) {
            return Promise.reject();
        }
        this.isRefreshing = true;

        return this.props.onRefresh();
    }
    onRefreshEnd(isSuccess) {
        this.isRefreshing = false;
        const {onRefreshEnd} = this.props;

        typeof onRefreshEnd === 'function' && onRefreshEnd(isSuccess);
    }

    onLoad() {
        if (this.isRefreshing) {
            return Promise.reject();
        }
        this.isLoading = true;

        return this.props.onLoad();
    }
    onLoadEnd(isSuccess) {
        this.isLoading = false;
        const {onLoadEnd} = this.props;

        typeof onLoadEnd === 'function' && onLoadEnd(isSuccess);
    }

    componentWillReceiveProps() {
        if (this.isRefreshing) {
            this.isRefreshed = true;
        }
    }

    componentDidUpdate() {
        if (this.isRefreshed) {
            this.isRefreshing = false;
            let {loadMore} = this.refs;

            if (!loadMore) {
                return;
            }
            if (!this.scrollPaneDOM) {
                loadMore = findDOMNode(loadMore);
                this.scrollPaneDOM = Util.getScrollPane(loadMore);
                if (this.scrollPaneDOM === window) {
                    this.scrollPaneDOM = document.body;
                }
                this.loadMoreContent = loadMore.querySelector('.load-more-content');
            }

            if (!this.scrollPaneDOMHeight) {
                this.scrollPaneDOMHeight = this.scrollPaneDOM.clientHeight;
            }

            if (this.scrollPaneDOMHeight > Util.getStyle(this.loadMoreContent, 'height', true)) {
                this.onLoad().then(this.onLoadEnd(true), this.onLoadEnd(false));
            } else {
                this.isRefreshed = false;
            }
        }
    }

    render() {
        const {
            threshold, offsetRefresh, duration, tipsRefresh,
            initLoad, hasNext, isFill, offsetLoadMore, tipsLoadMore,
            children, refresh, loader, className
        } = this.props;

        return <div className={`pull-to-refresh${className ? ' ' + className : ''}`}>
            {
                refresh && <Refresh
                    threshold={threshold}
                    offset={offsetRefresh}
                    duration={duration}
                    tips={tipsRefresh}
                    onRefresh={this.onRefresh.bind(this)}
                    onRefreshEnd={this.onRefreshEnd.bind(this)} />
            }
            {
                loader ? <LoadMore
                    ref="loadMore"
                    initLoad={initLoad}
                    hasNext={hasNext}
                    isFill={isFill}
                    offset={offsetLoadMore}
                    tips={tipsLoadMore}
                    onLoad={this.onLoad.bind(this)}
                    onLoadEnd={this.onLoadEnd.bind(this)}>
                    {children}
                </LoadMore> : <div className="pull-to-refresh-content">{children}</div>
            }
        </div>;
    }
}

PullToRefresh.defaultProps = {
    refresh: true,
    loader: true
};
if (process.env.NODE_ENV !== 'production') {
    PullToRefresh.PropTypes = {
        // 是否有下拉刷新功能
        refresh: PropTypes.bool,
        // 是否有上拉加载功能
        loader: PropTypes.bool
    }; 
}