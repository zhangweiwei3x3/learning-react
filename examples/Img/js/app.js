/**
 * anchor : zww
 * time   : 2016-10-13
 */
'use strict';

import Img from '../../../src/Img';

class App extends React.Component {
    render() {
        return <div>
            <Img src="http://img5.imgtn.bdimg.com/it/u=4155302816,1201715785&fm=21&gp=0.jpg" deafultImg="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" lazy={true} />
            <Img src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" lazy={true} />
        </div>;
    }
}

ReactDOM.render(<App />, document.getElementById('html-body'));