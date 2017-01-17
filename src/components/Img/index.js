/**
 * 图片组件
 *     默认图片和图片加载
 *     
 * anchor: zww
 * date: 2016-10-13
 *
 *  className: class（string）
 *  src: 图片 src（string）
 *  type: 默认图片格式（string）
 *  scale: 图片比例16:9（string）
 *  deafultImg: 上传的默认图片（string）
 *  deafultImgName: 本地的默认图片（string）
 *  isLazy: 是否懒加载（bool）
 *  initLoad: 初始化就加载图片（bool）
 *
 */
import {Util} from '../../libs/Util';
const {Component, PropTypes} = React;
const reqImg = require.context('./');

export default class Img extends Component {
    loadImg() {
        const {img} = this.refs;
        
        Util.loadImg(img, this.props.src)
            .then(() => {
                img.classList.remove('img-load-before');
            }, () => {
                img.src = this.defaultImg;
            });
    }

    componentDidMount() {
        const {isLazy, initLoad, scale} = this.props;
        const scaleXY = scale.split(':');

        this.width = parseFloat(Util.getStyle(this.refs.img, 'width'));

        if (this.width) {
            this.height = this.width * scaleXY[1] / scaleXY[0];
            this.refs.img.style.height = this.height + 'px';
        } else {
            this.width = window.innerWidth || 640;
            this.height = this.width * scaleXY[1] / scaleXY[0];
        }

        if (initLoad && isLazy) {
            this.loadImg();
        }
    }

    componentWillReceiveProps(nextProps) {
        const {isLazy, initLoad} = nextProps;

        if (initLoad && isLazy) {
            this.loadImg();
        }
    }

    render() {
        const {className, isLazy, src, deafultImg, deafultImgName, scale, type} = this.props;
        let realClassName = `img${className ? ' ' + className : ''}`,
            currentSrc = src;

        if (isLazy) {
            realClassName += ' img-load-before';

            if (deafultImg) {
                currentSrc = deafultImg;
            } else {
                let currentSrcName = `./default-${scale ? scale.replace(':', 'x') : ''}${deafultImgName ? '-' + deafultImgName : ''}.${type}`;
                
                currentSrc = reqImg(currentSrcName);

                if (process.env.NODE_ENV !== 'production' && !currentSrc) {
                    throw new Error(`${currentSrcName}不存在`);
                }
            }
            this.defaultImg = currentSrc;
        }

        return <img ref="img" {...this.props} className={realClassName} src={currentSrc} />;
    }
}

Img.defaultProps = {
    type: 'jpg', // 默认图片格式
    scale: '16:9', // 图片比例
    isLazy: true, // 是否懒加载
    initLoad: true // 初始化就加载图片
};
if (process.env.NODE_ENV !== 'production') {
    Img.PropTypes = {
        className: PropTypes.string,
        // 图片 src
        src: PropTypes.string.isRequired,
        // 默认图片格式
        type: PropTypes.string,
        // 图片比例
        scale: PropTypes.string,
        // 上传的默认图片
        deafultImg: PropTypes.string,
        // 本地的默认图片 例： default-16X9-deafultImgName.type
        deafultImgName: PropTypes.string,
        // 是否懒加载
        isLazy: PropTypes.bool,
        // 初始化就加载图片
        initLoad: PropTypes.bool
    };
}