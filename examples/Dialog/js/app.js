/**
 * anchor : zww
 * time   : 2016-10-10
 */
import {PureComponent} from 'react';
import {openAlert, openConfirm} from '../../../src/components/Dialog';

let div = document.createElement('div'),
    html;

for (let i = 0; i < 1000; i++) {
    html += `<p>${i}</p>`;
}
div.innerHTML = html;
document.body.appendChild(div);

class App extends PureComponent {
    render() {
        return <div>react Component test</div>;
    }
}

openAlert({
    title: 'alert-title',
    className: 'alert-test222',
    dom: 'alert test',
    isAnimate: false,
    onOk: function () {
        console.log('openAlert onOk');
    }
});


setTimeout(() => {
    openAlert({
        title: 'alert-title',
        className: 'alert-test222',
        dom: 'alert test1111111111111111',
        isAnimate: false,
        onOk: function () {
            console.log('openAlert onOk');
        }
    });
}, 3000);

openConfirm({
    title: 'confirm-title',
    className: 'confirm-test222',
    dom: <App />,
    isAnimate: true,
    manualClose: true,
    onOk: function (close) {
        setTimeout(() => {
            close();
        }, 1000);
        console.log('onOk', close);
    },
    onCancel: function () {
        console.log('onCancel');
    }
});

setTimeout(() => {
    openConfirm({
        title: 'confirm-title',
        className: 'confirm-test222',
        dom: <div><p>11111111111111111111</p><p>11111111111111111111</p></div>,
        isAnimate: true,
        manualClose: true,
        onOk: function (close) {
            setTimeout(() => {
                close();
            }, 1000);
            console.log('onOk', close);
        },
        onCancel: function () {
            console.log('onCancel');
        }
    });
}, 3000);