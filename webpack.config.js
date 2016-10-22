var webpack = require('webpack');
var glob = require('glob');

// 目录
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var myPath = './dist';
var packPath = path.join(__dirname, myPath);

// clean
var CleanWebpackPlugin = require('clean-webpack-plugin');

// sass
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// html
var HtmlWebpackPlugin = require('html-webpack-plugin');

var lib = [
        'react',
        'react-dom',
        'redux',
        'react-redux',
        'react-router'
    ];

var webpackConfig = {
    entry: {
        // 公用js打包合并
        lib: [
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
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            // jsx es6 解析
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {presets: ['react', 'es2015']}
            },

            // sass 解析
            { 
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            },
            {
                test: /\.(png|jpg|jpeg|gi)$/,
                loader: 'url?limit=8192'
            }
        ]
    },
    eslint: {
        configFile: '.eslintrc',
        formatter: require('eslint-friendly-formatter')
    },
    plugins: [
        // 清空
        new CleanWebpackPlugin(packPath, {
            root: __dirname,
            verbose: true, 
            dry: false
        }),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': '"production"'
        //     }
        // }),
        // 变成全局变量，不用require了
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            Redux: 'redux',
            ReactRedux: 'react-redux',
            ReactRouter: 'react-router'
        }),
        new ExtractTextPlugin('[name]/style.css', {allChunks: true})
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

        entries[name] = [
            path.resolve(__dirname, `./examples/${name}/js/app.js`),
            path.resolve(__dirname, `./examples/${name}/css/app.scss`),
        ];
    });

    return entries;
}
        
var entries = getEntries('examples/**/js/app.js');
Object.keys(entries).forEach((name) => {
    // 每个页面生成一个entry
    webpackConfig.entry[name] = entries[name];
    
    // 每个页面生成一个html
    var plugin = new HtmlWebpackPlugin({
        // 生成出来的html文件名
        filename: name + '/index.html',
        template: `./examples/${name}/index.html`,
        inject: true,
        chunks: ['lib', name],
        // minify: {
        //     collapseWhitespace: true, // 去除空格
        //     removeStyleLinkTypeAttributes: true,
        //     removeScriptTypeAttributes: true,
        //     minifyCSS: true,
        //     minifyJS: true,
        //     html5: true
        // }
    });

    webpackConfig.plugins.push(plugin);
})

module.exports = webpackConfig;