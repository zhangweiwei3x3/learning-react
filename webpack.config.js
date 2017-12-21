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

var env = process.env.NODE_ENV; // 用于判断是开发环境（development）还是生产环境（production）
var minify = {}; // HtmlWebpackPlugin 生产环境 压缩 这个是压缩 index.html 文件的
var devtool = false;
var loaders = [{
    loader: 'babel-loader',
    options: {
        cacheDirectory: true,
        plugins: ['transform-runtime', ['import', {libraryName: 'antd', style: true}]],
        presets: ['es2015', 'react', 'stage-0']
    }
}];
// 开发环境和生成环境不同的插件
var buildPlugins = [];

// bulid
if (env === 'production') {
    // 压缩
    buildPlugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
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
    minify = {
        minifyJS: true,
        collapseWhitespace: true,
        removeComments: true
    };

// 开发环境
} else {
    devtool = 'source-map';
    loaders.push('eslint-loader');
}

var webpackConfig = {
    devtool: devtool,
    entry: {
        // 公用js打包合并
        lib: [
            'babel-polyfill',
            'whatwg-fetch',
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: env !== 'production' ? '[name].js' : '[name]-[chunkhash:6].js',
        path: packPath,
        pathinfo: env !== 'production' // 合并文件中打印出打包的文件名称
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: loaders
        }, {
            test: /\.s?css$/,
            exclude: /(node_modules)/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => {
                            return [require('postcss-import')(), autoprefixer({
                                browsers: ['> 0%', 'last 2 versions']
                            })];
                        }
                    }
                }, 'sass-loader']
            })
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            exclude: /node_modules/,
            // 8192 = 1024 * 8 小于等于8k的转换成 base64
            use: [{
                loader: 'url-loader',
                options: {
                    // 8192 = 1024 * 8 小于等于8k的转换成 base64
                    limit: 8192,
                    name: env !== 'production' ? './src/img/[name].[ext]' : './src/img/[name]-[hash:6].[ext]'
                }
            }]
        }, {
            test: /\.(woff|svg|eot|ttf)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: env !== 'production' ? './src/font/[name].[ext]' : './src/font/[name]-[hash:6].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        // 清空
        new CleanWebpackPlugin(packPath, {
            root: __dirname,
            verbose: true, 
            dry: false
        }),
        // 变成全局变量，不用require了
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new ExtractTextPlugin({
            filename: env !== 'production' ? '[name].css' : '[name]-[contenthash:6].css', 
            allChunks: true
        }),
        // improt lib（entry.lib） 中的插件不会在其他地方加载
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lib',
            filename: env !== 'production' ? 'lib.js' : 'lib-[chunkhash:6].js',
            minChunks: Infinity
        }),
        ...buildPlugins
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
        chunks: ['lib', name],
        chunksSortMode: (chunk1, chunk2) => {
            var order = ['lib'];
            var order1 = order.indexOf(chunk1.names[0]);
            var order2 = order.indexOf(chunk2.names[0]);

            return order2 - order1;  
        }
    };
    
    if (minify) {
        option.minify = minify;
    }
    
    // 每个页面生成一个html
    var plugin = new HtmlWebpackPlugin(option);
    webpackConfig.plugins.push(plugin);
    webpackConfig.entry[name] = entries[name];
})

module.exports = webpackConfig;