/**
 * anchor: zww
 * time: 2016-10-08
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
    title: '提示',
    type: 'alert',
    isAnimate: false,
    manualClose: false,
    hasOverlayClick: false,
    hasCloseBtn: false
};
if (process.env.NODE_ENV !== 'production') {
    Dialog.PropTypes = {
        type: PropTypes.oneOf(['alert', 'confirm']),
        dom: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        manualClose: PropTypes.bool, // 手动关闭弹窗，只在 onOk 中使用
        onOk: PropTypes.func,
        onCancel: PropTypes.func
    }; 
}

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