/**
 * 模态框
 * 
 * anchor: zww
 * date: 2016-10-08
 * 
 *  title: 标题（string）
 *  className: class（string）
 *  isAnimate: 是否有动画（bool）
 *  hasOverlayClick: 点击遮罩层是否关闭弹窗（bool）
 *  btns: 底部的按钮（array）
 *  visiable: 弹窗是否显示（bool）
 *  hasCloseBtn: 标题是否有关闭按钮（bool）
 *  closeCallback: 弹窗关闭后的回调（func）
 *  onCancel: 点击确认按钮的回调（func）
 */
import './style.scss';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import {Util} from '../../libs/Util';

class Modal extends PureComponent {
    constructor(props) {
        super(props);

        this.isFirst = true; // 第一次显示时再渲染
        this.transitionEnd = this.transitionEnd.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.container = document.createElement('div');
        document.body.appendChild(this.container);
    }

    onCancel() {
        const {onCancel} = this.props;

        if (typeof onCancel === 'function') {
            onCancel();
        }
    }

    adjustDialog() {
        let winHeight = window.innerHeight,
            dialogHeight = parseFloat(Util.getStyle(this.modalDialog, 'height'));

        if (dialogHeight < winHeight) {
            this.modalDialog.style.top = `-${(winHeight - dialogHeight) / 6}px`;
        }
    }

    renderInit() {
        const {visiable, isAnimate, closeCallback} = this.props;

        if (visiable) {
            this.isFirst = false;

            Modal.count++;
            document.body.classList.add('modal-open');
            isAnimate && setTimeout(() => {
                this.modal.classList.add('in');
            });
        } else {
            Modal.count--;
            Modal.count < 1 && document.body.classList.remove('modal-open');

            // 动画 走 transitionEnd
            if (!isAnimate && typeof closeCallback === 'function') {
                closeCallback();
            }
        }
    }

    // transition 动画结束后事件
    transitionEnd() {
        const {visiable, closeCallback} = this.props;

        if (!visiable) {
            this.modal.classList.remove('show');

            if (typeof closeCallback === 'function') {
                closeCallback();
            }
        }
    }

    overlay() {
        if (this.props.hasOverlayClick) {
            this.onCancel();
        }
    }

    _renderHeader(title) {
        if (!title) {
            return null;
        }
        const {hasCloseBtn} = this.props;
        let dom = <div className="modal-header">{title}</div>;

        if (hasCloseBtn) {
            dom = <div className="modal-header">
                <div className="title">{title}</div>
                <span onClick={this.onCancel}>X</span>
            </div>;
        }

        return dom;
    }

    _renderFooter(btns) {
        return btns && <div className="modal-footer clearfix">
            {
                btns.map((item, index) => {
                    return <div key={index}>{item}</div>;
                })
            }
        </div>;
    }

    componentDidMount() {
        this.renderInit();

        if (this.props.isAnimate) {
            this.modalDialog.addEventListener(Util.getTransitionEndEvent(), this.transitionEnd, false);
        }
    }

    componentDidUpdate() {
        this.renderInit();
    }

    componentWillUnmount() {
        if (this.props.isAnimate) {
            this.modalDialog.removeEventListener(Util.getTransitionEndEvent(), this.transitionEnd, false);
        }

        // 移除dom
        document.body.removeChild(this.container);
        this.container = null;
    }

    render() {
        const {title, children, btns, className, visiable, isAnimate} = this.props;
        let modalClassName = `modal${className ? ' ' + className : ''}`;

        if (isAnimate) {
            if (visiable) {
                modalClassName += ' animate show';
            } else if (this.isFirst) {
                modalClassName += ' animate out';
            } else {
                modalClassName += ' animate show out';
            }
        } else {
            modalClassName += visiable ? ' show' : '';
        }

        return createPortal((visiable || !this.isFirst || isAnimate) && <div ref={(e) => {this.modal = e;}} className={modalClassName}>
            <div className="modal-overlay" onClick={this.overlay.bind(this)}></div>
            <div ref={(e) => {this.modalDialog = e;}} className="modal-dialog">
                {
                    this._renderHeader(title)
                }
                <div className="modal-body">
                    {
                        children
                    }
                </div>
                {
                    this._renderFooter(btns)
                }
            </div>
        </div>, this.container);
    }
}

Modal.count = 0;
Modal.defaultProps = {
    isAnimate: false,
    hasOverlayClick: true, 
    hasCloseBtn: true 
};
if (process.env.NODE_ENV !== 'production') {
    Modal.propTypes = {
        // 标题
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        // class
        className: PropTypes.string,
        // 是否有动画
        isAnimate: PropTypes.bool,
        // 点击遮罩层是否关闭弹窗
        hasOverlayClick: PropTypes.bool,
        // 底部的按钮
        btns: PropTypes.array,
        // 弹窗是否显示
        visiable: PropTypes.bool,
        // 标题是否有关闭按钮
        hasCloseBtn: PropTypes.bool,
        // 弹窗关闭后的回调
        closeCallback: PropTypes.func, 
        // 点击确认按钮的回调
        onCancel: PropTypes.func
    }; 
}

export default Modal;