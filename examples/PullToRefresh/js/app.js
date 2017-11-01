/**
 * anchor : zww
 * time   : 2016-10-14
 */
import {PureComponent} from 'react';
import {render} from 'react-dom';
import PullToRefresh from '../../../src/components/PullToRefresh/';

const initData = [];

for (let i = 0; i < 10; i++) {
    initData.push((i + '').repeat(10));
}

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pageNo: 2,
            hasNext: true,
            data: [...initData]
        };
    }

    onRefresh() {
        console.log(11111111, '下拉刷新');
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.setState({data: [...initData]});
                reject();
            }, 3000);
        });
    }

    onRefreshEnd(isSuccess) {
        if (isSuccess) {
            console.log(11111111, '刷新成功', isSuccess);
        } else {
            console.log(11111111, '刷新失败', isSuccess);
        }
    }

    onLoad(pageNo = 1, pageSize = 20) {
        const {data} = this.state;

        console.log(11111111, '加载', pageNo, pageSize);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    data.push((i + '').repeat(10));
                }

                console.log(11111111, '加载完成', pageNo, pageSize);
                this.setState({data: [...data], pageNo});
                reject();
            }, 1000);
        });
    }
    onLoadEnd(isSuccess) {
        if (isSuccess) {
            console.log(11111111, '加载成功', isSuccess);
        } else {
            console.log(11111111, '加载失败', isSuccess);
        }
    }

    render() {
        const {hasNext, data} = this.state;

        return <PullToRefresh
            onLoad={this.onLoad.bind(this)}
            onLoadEnd={this.onLoadEnd.bind(this)}
            hasNext={hasNext}
            tipsRefresh={[<img src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />, '松开更新...', '正在加载...']}
            onRefresh={this.onRefresh.bind(this)}
            onRefreshEnd={this.onRefreshEnd.bind(this)}>
            {
                data.map((item, index) => {
                    return <div key={index}>{item}</div>;
                })
            }
        </PullToRefresh>;
    }
}

render(<App />, document.getElementById('html-body'));
