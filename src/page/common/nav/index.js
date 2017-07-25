require("./nav.css")

var mmUtil = require("util/mmutil.js");
var user_service = require("service/user-service.js");
var cart_service = require("service/cart-service.js");
var nav = {
    //初始化
    init: function() {
        this.bind();
        this.loadUserInfo();
        this.loadCartInfo();
        return this;
    },

    // 绑定事件
    bind: function() {
        // 处理登录
        $(".js-login").click(function() {
            mmutil.doLogin();
        });
        //处理注册
        $(".js-register").click(function() {
            window.location.href = './register.html';
        });
        // 处理退出
        $(".js-loginOut").click(function() {
            user_service.loginOut(function() {
                window.location.reload();
            }, function() {
                mmUtil.errorHint();
            });
        })
    },

    //加载用户信息
    loadUserInfo: function() {
        user_service.checkLogin(function(res) {
            $(".user.not-login").hide().siblings('.user.login').show().find('userName').text(res.userName)
        }, function(errMsg) {
            // do nothing
        })
    },

    //加载购物车信息
    loadCartInfo: function() {
        cart_service.getCartCount(function(res) {
            $(".nav-item.cart-count").text(res || 0);
        }, function(errMsg) {
            $(".nav-item.cart-count").text(0);
        })
    }

}

module.exports = nav.init();