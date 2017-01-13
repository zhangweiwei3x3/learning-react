/**
 * anchor : zww
 * time   : 2016-10-14
 */
import Refresh from '../../../src/PullToRefresh/Refresh';

class App extends React.Component {
    onRefresh() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    render() {
        return <div className="load-more">
            <Refresh
                tips={[<img src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />, '松开更新...', '正在加载...']}
                onRefresh={this.onRefresh.bind(this)} />
            <div className="content"></div>
        </div>;
    }
}

ReactDOM.render(<App />, document.getElementById('html-body'));