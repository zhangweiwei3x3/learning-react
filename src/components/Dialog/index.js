/**
 * 模拟 alert confirm
 * 
 * anchor: zww
 * date: 2016-10-08
 *
 * openAlert
 *     title: 提示标题（string）
 *     dom: 提示内容（string || node）
 *     isAnimate: 是否有动画（bool）
 *     hasOverlayClick: 点击遮罩层是否关闭弹窗（bool）
 *     hasCloseBtn: 标题处是否有关闭按钮（bool）
 *     manualClose: 是否手动关闭弹窗（bool）
 *     onOk: 点击确认按钮的回调函数（func）
 *     
 * openConfirm
 *     title: 提示标题（string）
 *     dom: 提示内容（string || node）
 *     isAnimate: 是否有动画（bool）
 *     hasOverlayClick: 点击遮罩层是否关闭弹窗（bool）
 *     hasCloseBtn: 标题处是否有关闭按钮（bool）
 *     onOk: 点击确认按钮的回调函数（func）
 *     onCancel: 点击取消按钮的回调函数（func）
 */
import './style.scss';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import Modal from '../Modal';

class Dialog extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            visiable: true
        };

        this.onClose = this.onClose.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onOk = this.onOk.bind(this);
    }

    onClose() {
        this.state.visiable && this.setState({visiable: false});
    }
    
    onCancel() {
        const {onCancel} = this.props;

        this.onClose();
        if (typeof onCancel === 'function') {
            onCancel();
        }
    }

    onOk() {
        const {manualClose, onOk} = this.props;

        if (typeof onOk === 'function') {
            if (manualClose) {
                onOk(this.onClose);
            } else {
                onOk();
                this.onClose();
            }
        } else {
            this.onClose();
        }
    }

    getBtns() {
        const {type} = this.props;

        switch (type) {
            case 'alert': 
                return [
                    <button onClick={this.onCancel}>确定</button>
                ];

            case 'confirm': 
                return [
                    <button onClick={this.onCancel}>取消</button>,
                    <button onClick={this.onOk}>确定</button>
                ];
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visiable !== this.state.visiable) {
            this.setState({visiable: nextProps.visiable});
        }
    }

    render() {
        const {dom} = this.props;

        return <Modal {...this.props} visiable={this.state.visiable} btns={this.getBtns()} onCancel={this.onCancel}>
            {
                dom
            }
        </Modal>;
    }
}

Dialog.defaultProps = {
    title: '提示', // 提示标题
    isAnimate: false, // 是否有动画
    manualClose: false, // 是否手动关闭弹窗
    hasOverlayClick: false, // 点击遮罩层是否关闭弹窗
    hasCloseBtn: false // 标题处是否有关闭按钮
};
if (process.env.NODE_ENV !== 'production') {
    Dialog.propTypes = {
        // 提示标题
        type: PropTypes.oneOf(['alert', 'confirm']),
        // 提示内容 string || node
        dom: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        // 是否手动关闭弹窗
        manualClose: PropTypes.bool,
        // 点击确认按钮的回调函数
        onOk: PropTypes.func,
        // 点击取消按钮的回调函数
        onCancel: PropTypes.func
    }; 
}

// 从 DOM 中移除已经挂载的 React 组件
// 如果在 container 内没有组件挂载，这个函数将什么都不做。
// 如果组件成功移除，则返回 true；
// 如果没有组件被移除，则返回 false
function unmountComponentAtNode(container) {
    if (!container) {
        return;
    }
    const unmountResult = ReactDOM.unmountComponentAtNode(container);

    if (unmountResult) {
        container.parentNode.removeChild(container);
    }

    container = null;
}

/**
 * openAlert
 *     title: 提示标题
 *     dom: 提示内容 string || node
 *     isAnimate: 是否有动画
 *     hasOverlayClick: 点击遮罩层是否关闭弹窗
 *     hasCloseBtn: 标题处是否有关闭按钮
 *     manualClose: 是否手动关闭弹窗
 *     onOk: 点击确认按钮的回调函数
 *     closeCallback: 弹窗关闭后的回调
 * 
 */
export const openAlert = (option) => {
    let div = document.createElement('div'),
        {className, closeCallback} = option;

    option.type = 'alert';
    option.visiable = true;
    option.onCancel = option.onOk;
    option.onOk = null;
    option.closeCallback = () => {
        unmountComponentAtNode(div);
        typeof closeCallback === 'function' && closeCallback();
    };
    className = `alert-dialog${className ? ' ' + className : ''}`;

    document.body.appendChild(div);

    render(<Dialog {...option} className={className} />, div);
};

/**
 * openConfirm
 *     title: 提示标题
 *     dom: 提示内容 string || node
 *     isAnimate: 是否有动画
 *     hasOverlayClick: 点击遮罩层是否关闭弹窗
 *     hasCloseBtn: 标题处是否有关闭按钮
 *     onOk: 点击确认按钮的回调函数
 *     onCancel: 点击取消按钮的回调函数
 *     closeCallback: 弹窗关闭后的回调
 * 
 */
export const openConfirm = (option) => {
    let div = document.createElement('div'),
        {className, closeCallback} = option;

    option.type = 'confirm';
    option.visiable = true;
    option.closeCallback = () => {
        unmountComponentAtNode(div);
        typeof closeCallback === 'function' && closeCallback();
    };
    className = `confirm-dialog${className ? ' ' + className : ''}`;

    document.body.appendChild(div);

    render(<Dialog {...option} className={className} />, div);
};