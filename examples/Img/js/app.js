/**
 * anchor : zww
 * time   : 2016-10-13
 */
import Img from '../../../src/components/Img';

class App extends React.Component {
    render() {
        return <div>
            <Img src="http://img5.imgtn.bdimg.com/it/u=4155302816,1201715785&fm=21&gp=0.jpg" deafultImg="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
            <Img src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
        </div>;
    }
}

ReactDOM.render(<App />, document.getElementById('html-body'));