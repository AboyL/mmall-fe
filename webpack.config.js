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
        "list": ["./src/./page/list/list.js"],
        "detail": ["./src/./page/detail/detail.js"],
        "common": ["./src/./page/common/index.js"],
        "login": ["./src/page/user-login/user-login.js"],
        "register": ["./src/page/user-register/user-register.js"],
        "passwordReset": ["./src/page/passwordReset/passwordReset.js"],
        "user-center": ["./src/page/user-center/user-center.js"],
        "user-center-updata": ["./src/page/user-center-updata/user-center-updata.js"],
        "user-pass-updata": ["./src/page/user-pass-updata/user-pass-updata.js"],
        "result": ["./src/page/result/result.js"],
    },
    output: {
        path: __dirname + '/dist/',
        // publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',
        // publicPath: 'dev' === WEBPACK_ENV ? '../' : '//s.happymmall.com/mmall-fe/dist/',

        publicPath: "/dist/", //其实这个也可以,但是那个是我们的最终上线版本更好用
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
        new htmlWebpackPlugin(getHtmlConfig("index", "首页")),
        new htmlWebpackPlugin(getHtmlConfig("list", "商品列表")),
        new htmlWebpackPlugin(getHtmlConfig("detail", "商品详情")),
        new htmlWebpackPlugin(getHtmlConfig("login", "登录")),
        new htmlWebpackPlugin(getHtmlConfig("register", "注册")),
        new htmlWebpackPlugin(getHtmlConfig("passwordReset", "找回密码")),
        new htmlWebpackPlugin(getHtmlConfig("user-center", "个人中心")),
        new htmlWebpackPlugin(getHtmlConfig("user-center-updata", "修改个人信息")),
        new htmlWebpackPlugin(getHtmlConfig("user-pass-updata", "修改密码")),
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