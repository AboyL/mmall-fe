mmUtil = require("../util/mmUtil.js");

var user_service = {


    // 检查登录
    checkLogin: function(resolve, reject) {
        mmUtil.request({
            url: mmUtil.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 处理登出
    loginOut: function(resolve, reject) {
        mmUtil.request({
            url: mmUtil.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
}

module.exports = user_service;