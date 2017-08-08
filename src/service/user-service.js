mm = require("../util/mm.js");

var user_service = {

    // 登录
    login: function(userdata, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/user/login.do'),
            data: userdata,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 注册
    register: function(userdata, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/user/register.do'),
            data: userdata,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查登录
    checkLogin: function(resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查用户名是否存在
    checkUsername: function(username, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/user/check_valid.do'),
            data: {
                type: "username",
                str: username
            },
            method: "post",
            success: resolve,
            error: reject
        })
    },
    // 得到问题
    getQuestion: function(userdata, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/user/forget_get_question.do'),
            data: userdata,
            method: "post",
            success: resolve,
            error: reject
        })
    },
    // 检查答案
    checkAnwser: function(userdata, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/user/forget_check_answer.do'),
            data: userdata,
            method: "post",
            success: resolve,
            error: reject
        })
    },
    // 重置密码
    reset: function(userdata, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/user/forget_reset_password.do'),
            data: userdata,
            method: "post",
            success: resolve,
            error: reject
        })
    },
    // 获取用户信息
    getUserInfo: function(resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/user/get_user_info.do'),
            method: "post",
            success: resolve,
            error: reject
        })
    },
    updataUserInfo: function(data, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/user/update_information.do'),
            data: data,
            method: "post",
            success: resolve,
            error: reject
        })
    },
    passwordUpdata: function(data, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/user/reset_password.do'),
            data: data,
            method: "post",
            success: resolve,
            error: reject
        })
    }, // 处理登出
    loginOut: function(resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
}

module.exports = user_service;