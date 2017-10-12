/**
 * anchor : zww
 * time   : 2016-10-11
 */
import {PureComponent} from 'react';
import {render} from 'react-dom';
import Marquee from '../../../src/components/Marquee';

class App extends PureComponent {
    render() {
        return <Marquee>
            <p>11111111</p>
            <p>22222222</p>
            <p>33333333</p>
            <p>44444444</p>
            <p>55555555</p>
            <p>66666666</p>
        </Marquee>;
    }
}

render(<App />, document.getElementById('html-body'));
