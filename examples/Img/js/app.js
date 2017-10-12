/**
 * anchor : zww
 * time   : 2016-10-13
 */
import {PureComponent} from 'react';
import {render} from 'react-dom';
import Img from '../../../src/components/Img';

class App extends PureComponent {
    render() {
        return <div>
            <Img src="http://img5.imgtn.bdimg.com/it/u=4155302816,1201715785&fm=21&gp=0.jpg" deafultImg="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
            <Img src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
        </div>;
    }
}

render(<App />, document.getElementById('html-body'));