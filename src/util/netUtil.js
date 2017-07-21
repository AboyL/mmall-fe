// 用于请求网络数据的工具

//服务器地址
var conf = {
    serverHost: ''
};
// 添加hogan组件用于渲染
// var Hogan = require("hogan");
var Hogan = require('hogan.js');
var netUtil = {

    //网络请求
    request: function(param) {
        var _this = this;
        $.ajax({
            type: param.method || "get",
            url: param.url || '',
            dataType: param.dataType || 'json',
            data: param.data,
            success: function(res) {
                //请求成功也有很多种情况,根据我们的返回码来进行判断
                if (res.status === 0) {
                    // 请求成功
                    //要注意的是这里的param.success跟这里的success没有任何关系，如果他是一个函数，我们就调用回调函数进行成功的处理
                    // && 有点if的味道，如果前面的是错误的，因为短路，所以不会执行后面的，如果前面的是对的，还是要执行后面的代码，这是一种简化
                    typeof param.success === "function" && param.success(res.data, res.msg);
                } else if (res.status === 10) {
                    // 需要登录，需要跳转登录页
                    _this.doLogin();
                } else if (res.status === 1) {
                    //请求数据错误，返回错误信息
                    typeof param.err === "function" && param.err(res.msg);
                }
                console.log("success");
            },
            error: function(err) {
                // 请求错误，比如哦404什么的,返回错误码
                typeof param.error === "function" && param.error(err.status);
                console.log("error");
            }
        })

    },
    //获取服务器地址
    getServerUrl: function(path) {
        return conf.serverHost + path;
    },
    getUrlParam: function(name) {
        // 得到某个url中某个参数的值
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        // alert(window.location.search);
        var result = window.location.search.substr(1).match(reg);
        for (var i = 0; i < result.length; i++) {
            console.log(result[i]);
        }
        return result ? decodeURIComponent(result[2]) : '';
    },
    // renderHtml: function(htmlTemplate, data) {
    //     var template = Hogan.compile(htmlTemplate);
    //     var result = template.render(data);
    //     return result;


    // },
    renderHtml: function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        console.log("object");
        return result;
    },
    //统一跳转登录页面
    doLogin: function() {
        //跳转后要记录是从哪个页面跳转过去的方便跳转回来
        window.location.href = "./login.html?redirect=" + window.location.href;
    }
}

//暴露接口
module.exports = netUtil;