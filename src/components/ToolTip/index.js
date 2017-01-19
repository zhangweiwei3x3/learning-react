/**
 * 弹出层提示信息
 *     过几秒自动消失
 * 
 * anchor: zww
 * date: 2017-01-19
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
const openToolTip = (option) => {
    let div = document.createElement('div'),
        {msg, animation, duration, className} = Object.assign({}, openToolTip.defaultOption, option);

    div.className = `tips show animate${className ? ' ' + className : ''}`;
    div.innerHTML = `<div class="tips-content">${msg}</div>`;

    document.body.appendChild(div);

    setTimeout(() => {
        div.classList.add('in');
        setTimeout(() => {
            div.classList.remove('in');
            div.classList.add('out');
            setTimeout(() => {
                // document.body.removeChild(div);
            }, animation);
        }, duration);
    }, 0);
};

openToolTip.defaultOption = {
    animation: 3000, // 动画时间
    duration: 5000 // 显示的时间
};

export default openToolTip;