var webpack = require('webpack');
var glob = require('glob');
var path = require('path');
// 目录
var path = require('path');
var packPath = path.join(__dirname, './dist');
// clean
var CleanWebpackPlugin = require('clean-webpack-plugin');
// sass
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var px2rem = require('postcss-px2rem');
var autoprefixer = require('autoprefixer');
// html
var HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [];
var htmlMinify = null;
var loaders = ['babel', 'eslint-loader'];
var env = 'development';
// bulid
if (require('yargs').argv.e === 'prod') {
    env = 'production';
    loaders = ['babel'];
    htmlMinify = {
        collapseWhitespace: true, // 去除空格
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        html5: true
    };
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': '"production"'
        }
    }));
    // 模块去重
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true,
            warnings: false
        },
        mangle: {
            except: ['exports', 'require']
        }
    }));
}
var webpackConfig = {
    entry: {
        // 公用js打包合并
        lib: [
            'babel-polyfill',
            'whatwg-fetch',
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'react-router'
        ]
    },
    output: {
        path: packPath,
        filename: '[name]/index.js',
        pathinfo: env !== 'production' // 合并文件中打印出打包的文件名称
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: loaders
        }, {
            test: /\.s?css$/,
            exclude: /(node_modules)/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?outputStyle=expanded')
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            exclude: /node_modules/,
            // 8192 = 1024 * 8 小于等于8k的转换成 base64
            loader: 'url',
            query: {
                limit: 8192,
                name: env !== 'production' ? './src/img/[name].[ext]' : './src/img/[name]-[hash:6].[ext]'
            }
        }, {
            test: /\.(woff|svg|eot|ttf)$/,
            exclude: /node_modules/,
            loader: 'url',
            query: {
                limit: 10240,
                name: env !== 'production' ? './src/font/[name].[ext]' : './src/font/[name]-[hash:6].[ext]'
            }
        }]
    },
    postcss: [autoprefixer({
        browsers: ['> 0%', 'last 2 versions']
    }), px2rem({
        remUnit: 37.5, // iphone 6s 的默认设计稿
        baseDpr: 1 // 默认dpr 1
    })],
    plugins: [
        // 清空
        new CleanWebpackPlugin(packPath, {
            root: __dirname,
            verbose: true, 
            dry: false
        }),
        // 变成全局变量，不用require了
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            Redux: 'redux',
            ReactRedux: 'react-redux',
            ReactRouter: 'react-router'
        }),
        new ExtractTextPlugin('[name]/style.css', {allChunks: true}),
        // improt lib（entry.lib） 中的插件不会在其他地方加载
        new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js', Infinity),
        ...plugins
    ]
};

// 获取指定路径下的入口文件
function getEntries(globPath) {
    var files = glob.sync(globPath),
        entries = {};

    files.forEach((filepath) => {
        // 取倒数第二层做包名
        var split = filepath.split('/'),
            name = split[split.length - 3];

        entries[name] = [];

        // 存在 js 文件
        if (glob.sync(`./examples/${name}/js/app.js`).length) {
            entries[name].push(path.resolve(__dirname, `./examples/${name}/js/app.js`));
        }

        // 存在 scss 文件
        if (glob.sync(`./examples/${name}/css/app.scss`).length) {
            entries[name].push(path.resolve(__dirname, `./examples/${name}/css/app.scss`));
        }
    });

    return entries;
}
        
var entries = getEntries('examples/**/js/app.js');
Object.keys(entries).forEach((name) => {
    var option = {
        // 生成出来的html文件名
        filename: name + '/index.html',
        template: `./examples/${name}/index.html`,
        inject: true,
        chunks: ['lib', name]
    };
    
    if (htmlMinify) {
        option.minify = htmlMinify;
    }
    
    // 每个页面生成一个html
    var plugin = new HtmlWebpackPlugin(option);
    webpackConfig.plugins.push(plugin);
    webpackConfig.entry[name] = entries[name];
})

module.exports = webpackConfig;