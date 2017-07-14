/**
 * 模态框
 * 
 * anchor: zww
 * date: 2017-07-14
 * 
 *  isMobile： 是否是手机（bool）
 *  title: 标题（string）
 *  className: class（string）
 *  isAnimate: 是否有动画（bool）
 *  hasOverlayClick: 点击遮罩层是否关闭弹窗（bool）
 *  hasEscape: 按esc按键是否关闭（bool）
 *  btns: 底部的按钮（array）
 *  visiable: 弹窗是否显示（bool）
 *  hasCloseBtn: 标题是否有关闭按钮（bool）
 *  closeCallback: 弹窗关闭后的回调（func）
 *  onCancel: 点击确认按钮的回调（func）
 */
import Modal from './modal';
const {Component} = React;

export default class extends Component {
    appendMaskIntoDoc() {
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            <Modal {...this.props}>
                {this.props.children}
            </Modal>,
            this.container
        );
    }

    componentDidMount() {
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        this.appendMaskIntoDoc();
    }

    componentDidUpdate() {
        this.appendMaskIntoDoc();
    }

    componentWillUnmount() {
        document.body.removeChild(this.container);
        this.container = null;
    }

    render() {
        return null;
    }
}