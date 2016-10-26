/**
 * anchor: zww
 * time: 2016-10-13
 */

'use strict';

import Utils from '../libs/Utils';

const {Component, PropTypes} = React;

export default class Img extends Component {
    loadImg() {
        Utils.loadImg(this.refs.img, this.props.src, () => {
            this.refs.img.classList.remove('img-load-before');
        });
    }

    componentDidMount() {
        const {isLazy, hasLoaded, scale} = this.props;
        const scaleXY = scale.split(':');

        if (!hasLoaded && isLazy) {
            this.loadImg();
        }

        this.refs.img.style.height = parseFloat(Utils.getStyle(this.refs.img, 'width')) * scaleXY[1] / scaleXY[0] + 'px';
    }

    componentWillReceiveProps(nextProps) {
        const {isLazy, hasLoaded} = this.props;

        if (!hasLoaded && nextProps.isLazy) {
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
                
                currentSrc = require(currentSrcName);

                if (process.env.NODE_ENV !== 'production' && !currentSrc) {
                    throw new Error(`${currentSrcName}不存在`);
                }
            }
        }

        return <img ref="img" {...this.props} className={realClassName} src={currentSrc} />;
    }
}

Img.defaultProps = {
    type: 'jpg',
    scale: '16:9',
    isLazy: true,
    hasLoaded: false
};
if (process.env.NODE_ENV !== 'production') {
    Img.PropTypes = {
        className: PropTypes.string,
        src: PropTypes.string.isRequired,
        type: PropTypes.string, // 默认图片格式
        scale: PropTypes.string, // 图片比例
        deafultImg: PropTypes.string, // 上传的默认图片
        deafultImgName: PropTypes.string, // 本地的默认图片 例： default-16X9-deafultImgName.type
        isLazy: PropTypes.bool, // 是否懒加载
        hasLoaded: PropTypes.bool // 是否已经加载完成
    };
}