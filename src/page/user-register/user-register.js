require("../common/nav/nav.js");
require("../common/nav-simple/nav-simple.js");
require("./user-register.css");


var mmUtil = require("util/mmUtil.js");
var userService = require("service/user-service.js");

// 错误处理
var error = {
    show: function(msg) {
        $(".error-item").show().find(".error-msg").text(msg);

    },
    hide: function() {
        $(".error-item").hide().find(".error-msg").text('');
    }
}
var register = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        // 验证用户名
        $("#user-name").blur(function() {
            var username = $.trim($(this).val());
            // 异步验证用户名
            userService.checkUsername(username, function(data) {
                error.hide();
            }, function(msg) {
                error.show(msg);
            })
        })

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
            pssword: $.trim($("#user-password").val()),
            passwordConfirm: $.trim($("#user-password-comfirm").val()),
            phone: $.trim($("#phone").val()),
            email: $.trim($("#email").val()),
            question: $.trim($("#question").val()),
            answer: $.trim($("#answer").val()),

        };
        var result = this.validate(data);
        if (result.status) {
            // 验证通过，进行注册
            userService.register(data, function(res) {
                // 跳回以前的页面
                window.location.href = "./result.html?type=register";
            }, function(errMsg) {
                error.show(errMsg);
            });
        } else {
            // 验证失败，提示
        }
    },
    // 表单验证
    validate: function(data) {
        var result = {
            status: false,
            msg: ''
        };
        if (!mmUtil.validate(data.username, "notEmpty")) {
            result.msg = "用户名不能为空";
            error.show(result.msg);
            return result;
        };
        if (!mmUtil.validate(data.pssword, "notEmpty")) {
            result.msg = "密码不能为空";
            error.show(result.msg);
            return result;
        };
        //密码不能小于六位
        if (data.pssword.length < 6) {
            result.msg = "密码不能小于六位";
            error.show(result.msg);
            return result;
        };
        // 验证密码
        if (data.pssword !== data.passwordConfirm) {
            result.msg = "两次密码输入不一致";
            error.show(result.msg);
            return result;
        };
        // 验证手机号
        if (!mmUtil.validate(data.phone, "phone")) {
            result.msg = "请检查手机号码";
            error.show(result.msg);
            return result;
        };
        // 验证邮箱
        if (!mmUtil.validate(data.email, "email")) {
            result.msg = "请检查邮箱";
            error.show(result.msg);
            return result;
        };
        // 验证问题
        if (!mmUtil.validate(data.question, "notEmpty")) {
            result.msg = "问题不能为空";
            error.show(result.msg);
            return result;
        };
        // 验证回答
        if (!mmUtil.validate(data.answer, "notEmpty")) {
            result.msg = "答案不能为空";
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
    register.init();
})