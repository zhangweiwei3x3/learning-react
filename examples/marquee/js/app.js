/**
 * anchor : zww
 * time   : 2016-10-11
 */
import Marquee from '../../../src/Marquee';

class App extends React.Component {
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

ReactDOM.render(<App />, document.getElementById('html-body'));