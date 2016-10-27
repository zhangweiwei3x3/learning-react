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

'use strict';

const {Component, PropTypes} = React;
const {render} = ReactDOM;

import Modal from '../Modal';

class Dialog extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            visiable: true
        };
    }

    onClose() {
        this.setState({visiable: false});
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
                onOk(this.onClose.bind(this));
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
                    <button onClick={this.onCancel.bind(this)}>确定</button>
                ];

            case 'confirm': 
                return [
                    <button onClick={this.onCancel.bind(this)}>关闭</button>,
                    <button onClick={this.onOk.bind(this)}>确定</button>
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

        return <Modal {...this.props} visiable={this.state.visiable} btns={this.getBtns()} onCancel={this.onCancel.bind(this)}>
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
    Dialog.PropTypes = {
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

/**
 * openAlert
 *     title: 提示标题
 *     dom: 提示内容 string || node
 *     isAnimate: 是否有动画
 *     hasOverlayClick: 点击遮罩层是否关闭弹窗
 *     hasCloseBtn: 标题处是否有关闭按钮
 *     manualClose: 是否手动关闭弹窗
 *     onOk: 点击确认按钮的回调函数
 * 
 */
// alert 只有一个
var alertIsVisible = false;

export const openAlert = (option) => {
    let dialogContainer = document.getElementById(openAlert.id),
        className = option.className;

    if (!dialogContainer) {
        dialogContainer = document.createElement('div');
        dialogContainer.id = openAlert.id;
        document.body.appendChild(dialogContainer);
    }
    option.type = 'alert';
    option.visiable = true;
    option.onCancel = option.onOk;
    option.onOk = null;
    option.closeCallback = () => {
        alertIsVisible = false;
    };
    className = `alert-dialog${className ? ' ' + className : ''}`;

    if (alertIsVisible) {
        Modal.count--;
    }
    alertIsVisible = true;

    render(<Dialog {...option} className={className} />, dialogContainer);
};
openAlert.id = 'js-alert-dialog-' + Math.random().toString(36).slice(2, 5);


/**
 * openConfirm
 *     title: 提示标题
 *     dom: 提示内容 string || node
 *     isAnimate: 是否有动画
 *     hasOverlayClick: 点击遮罩层是否关闭弹窗
 *     hasCloseBtn: 标题处是否有关闭按钮
 *     onOk: 点击确认按钮的回调函数
 *     onCancel: 点击取消按钮的回调函数
 * 
 */
// confirm 只有一个
var confirmIsVisible = false;

export const openConfirm = (option) => {
    let dialogContainer = document.getElementById(openConfirm.id),
        className = option.className;

    if (!dialogContainer) {
        dialogContainer = document.createElement('div');
        dialogContainer.id = openConfirm.id;
        document.body.appendChild(dialogContainer);
    }

    option.type = 'confirm';
    option.visiable = true;
    option.closeCallback = () => {
        confirmIsVisible = false;
    };
    className = `confirm-dialog${className ? ' ' + className : ''}`;

    if (confirmIsVisible) {
        Modal.count--;
    }
    confirmIsVisible = true;

    render(<Dialog {...option} className={className} />, dialogContainer);
};
openConfirm.id = 'js-confirm-dialog-' + Math.random().toString(36).slice(2, 5);