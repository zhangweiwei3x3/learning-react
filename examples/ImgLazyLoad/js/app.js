/**
 * anchor : zww
 * time   : 2016-10-14
 */
import {PureComponent} from 'react';
import {findDOMNode, render} from 'react-dom';
import {ImgLazyLoadWrap, ImgLazyLoad} from '../../../src/components/ImgLazyLoad';

class App extends PureComponent {
    componentDidMount() {
        const wrap = findDOMNode(this.ImgLazyLoadWrap),
            content = this.content;
        let pageY = 0,
            scroll = 0;

        wrap.addEventListener('touchstart', (e) => {
            pageY = e.touches[0].pageY - scroll;
        });
        wrap.addEventListener('touchmove', (e) => {
            scroll = e.touches[0].pageY - pageY;
            content.style.transform = `translateY(${scroll}px)`;
        });
    }

    render() {
        return <ImgLazyLoadWrap ref={(e) => {this.ImgLazyLoadWrap = e;}} className="image-lazy-load img-lazy-load-wrap" offsetY="-100" eventType="touchmove">
            <div ref={(e) => {this.content = e;}}>
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
                <ImgLazyLoad src="http://img5.imgtn.bdimg.com/it/u=2438757233,2961043306&fm=21&gp=0.jpg" />
            </div>
        </ImgLazyLoadWrap>;
    }
}

render(<App />, document.getElementById('html-body'));
