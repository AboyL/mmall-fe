var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var htmlWebpackPlugin = require("html-webpack-plugin");
// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
};
// 环境变量配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';


var config = {
    entry: {
        "index": ["./src/./page/index/index.js"],
        "common": ["./src/./page/common/index.js"],
        "user-login": ["./src/page/user-login/user-login.js"],
        "result": ["./src/page/result/result.js"],
    },
    output: {
        path: __dirname + '/dist/',
        publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',
        // publicPath: 'dev' === WEBPACK_ENV ? '../' : '//s.happymmall.com/mmall-fe/dist/',

        // publicPath: "/dist/",//其实这个也可以,但是那个是我们的最终上线版本更好用
        filename: "js/[name].js"
    },
    externals: {
        "jquery": "window.jQuery"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
        }, {
            test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=100&name=resource/[name].[ext]'
        }, {
            test: /\.string$/,
            loader: "html-loader"
        }]
    },
    plugins: [
        //通用模块处理
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // 单独打包css文件
        new ExtractTextPlugin("css/[name].css"),
        // html模版处理
        new htmlWebpackPlugin(getHtmlConfig("index", "index")),
        new htmlWebpackPlugin(getHtmlConfig("login", "login")),
        new htmlWebpackPlugin(getHtmlConfig("result", "处理返回结果"))
    ],
    //  配置别名,我们就可以直接用这个了
    resolve: {
        alias: {
            util: __dirname + "/src/util",
            page: __dirname + "/src/page",
            service: __dirname + "/src/service",
            image: __dirname + "/src/image",
            node_nodules: __dirname + "/node_modules",
            font_awesome: __dirname + "/node_modules/font-awesome",
        }
    }
};
if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;