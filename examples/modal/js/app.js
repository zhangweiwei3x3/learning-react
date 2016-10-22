/**
 * anchor : zww
 * time   : 2016-10-09
 */
'use strict';

import Modal from '../../../src/Modal';

class App extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            visiable: false
        };
    }

    openModal() {
        this.setState({visiable: true});
    }

    onCancel() {
        this.setState({visiable: false});
    }

    render() {
        return <div>
            <button onClick={this.openModal.bind(this)}>click me</button>
            <Modal className="test" visiable={this.state.visiable} title="测试" btns={[<button onClick={this.onCancel.bind(this)}>取消</button>]} onCancel={this.onCancel.bind(this)}>
                <p>中共中央总书记习近平在主持学习时强调，加快推进网络信息技术自主创新，加快数字经济对经济发展的推动，加快提高网络管理水平，加快增强网络空间安全防御能力，加快用网络信息技术推进社会治理，加快提升我国对网络空间的国际话语权和规则制定权，朝着建设网络强国目标不懈努力。</p>
                <p>11111111</p>
                <p>11111111</p>
                <p>11111111</p>
            </Modal>
        </div>;
    }
}

ReactDOM.render(<App />, document.getElementById('html-body'));