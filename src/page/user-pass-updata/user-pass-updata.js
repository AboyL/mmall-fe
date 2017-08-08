require("./user-pass-updata.css");
var navSide = require("../common/nav-side/nav-side.js")
var mm = require("util/mm.js");
var userService = require("service/user-service.js");
var page = {
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function() {
        navSide.init({
            name: "user-pass-updata"
        });
    },
    bindEvent: function() {
        var _this = this;
        $("#submit").click(function() {
            _this.submit();

        })
    },
    submit: function() {
        var passwordOld = $("#password-old").val();
        var passwordNew = $("#password-new").val();
        var passwordComfirm = $("#password-comfirm").val();
        var data = {
            passwordOld: passwordOld,
            passwordNew: passwordNew,
            passwordComfirm: passwordComfirm
        }
        if (this.validate(data).status) {
            userService.passwordUpdata({
                passwordOld: data.passwordOld,
                passwordNew: data.passwordNew,
            }, function() {
                // 成功修改，调整到登录页面
                mm.doLogin();
            }, function(errMsg) {
                mm.errorHint(errMsg);
            })
        }
    },
    validate: function(data) {
        var result = {
            status: false,
            msg: ''
        };
        if (!mm.validate(data.passwordOld, "notEmpty")) {
            result.msg = "请输入原密码";
            mm.errorHint(result.msg);
            return result;
        };
        if ((!mm.validate(data.passwordNew, "notEmpty")) || data.passwordNew.length < 6) {
            result.msg = "请输入不少于6位的新密码";
            mm.errorHint(result.msg);
            return result;
        };
        if (!mm.validate(data.passwordComfirm, "notEmpty")) {
            result.msg = "确认密码不能为空";
            mm.errorHint(result.msg);
            return result;
        };
        if (data.passwordNew !== data.passwordComfirm) {
            result.msg = "两次密码不一致";
            mm.errorHint(result.msg);
            return result;
        };
        // 通过验证
        result.status = true;
        return result;
    }
}

$(function() {
    page.init();
})