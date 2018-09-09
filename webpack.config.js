/**
 * 4.x 更新记录
 * 需要安装cli
 * 打包css的时候不推荐使用 ExtractTextPlugin 做分离了
 * query 全部改成了 options
 * loader 全部变成了 use
 * 要指定 mode
 * 移除了commonChunksPulgin 插件 放在了config.optimization里面
 * webpack-dev-serve 不需要安装插件了,默认集成了
 * dev-serve 中 有代理选项,可以用来处理跨域问题
 */

let webpack = require("webpack");
// const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 放弃使用ExtractTextPlugin
const htmlWebpackPlugin = require("html-webpack-plugin");
// 官方推荐处理css的loader MiniCssExtractPlugin.loader 和 style-loader 由于某种原因不能共存。
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 获取html-webpack-plugin参数的方法 
const getHtmlConfig = function (name, title) {
    return {
        template: './src/view/' + name + '.html',
        // filename:  'view/'+name + '.html',
        filename: name + '.html',
        title: title,
        favicon: "./favicon.jpg",
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
};
// 环境变量配置，dev / online
let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';


let config = {
    // 4.x更新版本
    mode: 'dev' === WEBPACK_ENV ? 'development' : 'production',
    entry: {
        "common": "./src/page/common/index.js",
        "index": "./src/page/index/index.js",
        "list": "./src/page/list/list.js",
        "detail": "./src/page/detail/detail.js",
        "cart": "./src/page/cart/cart.js",
        "order-confirm": "./src/page/order-confirm/order-confirm.js",
        "order-list": "./src/page/order-list/order-list.js",
        "order-detail": "./src/page/order-detail/order-detail.js",
        "pay": "./src/page/pay/pay.js",
        "login": "./src/page/user-login/user-login.js",
        "register": "./src/page/user-register/user-register.js",
        "passwordReset": "./src/page/passwordReset/passwordReset.js",
        "user-center": "./src/page/user-center/user-center.js",
        "user-center-updata": "./src/page/user-center-updata/user-center-updata.js",
        "user-pass-updata": "./src/page/user-pass-updata/user-pass-updata.js",
        "result": "./src/page/result/result.js",
        "about": "./src/page/about/about.js",
    },
    output: {
        path: __dirname + '/dist/', // 4.x 默认就是/dist/
        // publicPath: WEBPACK_ENV === "dev" ? "/dist/" : "//s.happymall.com/mmall-fe/dist/", //上线or测试
        publicPath: WEBPACK_ENV === "dev" ? "/dist/" : "/dist/", //请用happymmall的接口的时候用的        
        // publicPath: '/dist/',
        // publicPath: WEBPACK_ENV === "dev" ? "/dist/" : "//localhost:8080/mmall/dist/", //tomcat测试版本      
        filename: "js/[name].js"
    },
    externals: {
        "jquery": "window.jQuery"
    },
    module: {
        rules: [{
            test: /\.css$/,
            // use: [{
            //         loader:WEBPACK_ENV!=='production'?MiniCssExtractPlugin.loader:"style-loader",
            //     },
            //     "css-loader"
            // ]
            use: [
                "style-loader",
                "css-loader"
            ]
            // use: [{
            //         loader: "style-loader/url"
            //     },
            //     {
            //         loader: "css-loader"
            //     }
            // ]
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: { /* * 【改动】：图片小于2kb的按base64打包 */
                    limit: 2048,
                    name: 'resource/[name].[ext]'
                }
            }]
        }, {
            test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'resource/[name].[ext]'
                }
            }]
        }, {
            test: /\.string$/,
            use: {
                loader: 'html-loader',
                // query: {
                //     minimize: true,
                //     removerAttributeQuotes: false
                // }
                // 4.x更新
                options: {
                    minimize: true,
                    removeAttributeQuotes: false
                }
            },
        }]
    },
    // optimization: {
    //     runtimeChunk: false,
    //     splitChunks: {
    //         // cacheGroups: {
    //         //     common: {
    //         //         name: "common",
    //         //         chunks: "all",
    //         //         minChunks: 2
    //         //     }
    //         // }
    //     }
    // },
    plugins: [
        //通用模块处理 在 optimization 里面进行处理
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     filename: 'js/base.js'
        // }),
        // 单独打包css文件
        // new ExtractTextPlugin("css/[name].css"),
        // new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: "css/[name].css",
        //     chunkFilename: "css/[id].css"
        // }),
        // html模版处理
        new htmlWebpackPlugin(getHtmlConfig("index", "首页")),
        new htmlWebpackPlugin(getHtmlConfig("list", "商品列表")),
        new htmlWebpackPlugin(getHtmlConfig("detail", "商品详情")),
        new htmlWebpackPlugin(getHtmlConfig("cart", "购物车")),
        new htmlWebpackPlugin(getHtmlConfig("order-confirm", "订单确认")),
        new htmlWebpackPlugin(getHtmlConfig("order-list", "订单列表")),
        new htmlWebpackPlugin(getHtmlConfig("order-detail", "订单详情")),
        new htmlWebpackPlugin(getHtmlConfig("pay", "支付")),
        new htmlWebpackPlugin(getHtmlConfig("login", "登录")),
        new htmlWebpackPlugin(getHtmlConfig("register", "注册")),
        new htmlWebpackPlugin(getHtmlConfig("passwordReset", "找回密码")),
        new htmlWebpackPlugin(getHtmlConfig("user-center", "个人中心")),
        new htmlWebpackPlugin(getHtmlConfig("user-center-updata", "修改个人信息")),
        new htmlWebpackPlugin(getHtmlConfig("user-pass-updata", "修改密码")),
        new htmlWebpackPlugin(getHtmlConfig("result", "处理返回结果")),
        new htmlWebpackPlugin(getHtmlConfig("about", "关于mmall")),
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
    },
    devServer: {
        port: 8888,
        inline: true,
        proxy: {
            '**/*.do': {
                target: 'http://test.happymmall.com',
                changeOrigin: true
            }
        }
    }
};


module.exports = config;