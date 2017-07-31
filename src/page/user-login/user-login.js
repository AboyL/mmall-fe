require("../common/nav-simple/nav-simple.js");
require("./user-login.css")

var mmUtil = require("util/mmUtil.js");
var userService = require("service/user-service.js");

// 错误处理
var error = {
    show: function(msg) {
        $(".error-item").show();
        $(".error-msg").text(msg);
    },
    hide: function() {
        $(".error-item").hide();
    }
}
var login = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        // 点击提交
        $("#submit").click(function() {
            _this.submit();
        });
        // 回车提交
        $("#user-password").keyup(function(e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        })
    },
    // 提交表单
    submit: function() {
        // 获取数据
        var data = {
            username: $.trim($("#user-name").val()),
            password: $.trim($("#user-password").val())
        };
        var result = this.validate(data);
        if (result.status) {
            // 验证通过，提交
            userService.login(data, function(res) {
                // 跳回以前的页面
                window.location.href = mmUtil.getUrlParam("redirect") || "./index.html";
            }, function() {
                alert("密码或用户名错误");
            });
        } else {
            // 验证失败，提示
            error.show(result.msg);
        }
    },
    // 表单验证
    validate: function(data) {
        var result = {
            status: false,
            msg: ''
        };
        if (!mmUtil.validate(data.username, "notEmpty")) {
            result.msg = "用户名不能位空";
            error.show(result.msg);
            return result;
        };
        if (!mmUtil.validate(data.password, "notEmpty")) {
            result.msg = "密码不能为空";
            error.show(result.msg);
            return result;
        };
        // 通过验证
        result.status = true;
        error.hide();
        return result;
    }
}

$(function() {
    login.init();
})