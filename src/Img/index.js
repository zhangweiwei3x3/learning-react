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
        const {lazy, isLoad} = this.props;

        if (!isLoad && lazy) {
            this.loadImg();
        }
    }

    componentWillReceiveProps(nextProps) {
        const {lazy, isLoad} = this.props;

        if (!isLoad && nextProps.lazy && !lazy) {
            this.loadImg();
        }
    }

    render() {
        const {className, lazy, src, deafultImg, deafultImgName, scale, type} = this.props;
        let realClassName = `img${className ? ' ' + className : ''}`,
            currentSrc = src;

        if (lazy) {
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
    lazy: true,
    isLoad: false
};
if (process.env.NODE_ENV !== 'production') {
    Img.PropTypes = {
        className: PropTypes.string,
        src: PropTypes.string.isRequired,
        type: PropTypes.string, // 默认图片格式
        scale: PropTypes.string, // 图片比例
        deafultImg: PropTypes.string, // 上传的默认图片
        deafultImgName: PropTypes.string, // 本地的默认图片 例： default-16X9-deafultImgName.type
        lazy: PropTypes.bool, // 是否懒加载
        isLoad: PropTypes.bool // 是否不加载 src
    };
}