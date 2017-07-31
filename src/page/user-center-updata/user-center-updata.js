require("./user-center-updata.css");
var navSide = require("../common/nav-side/nav-side.js")
var mmUtil = require("util/mmUtil.js");
var userService = require("service/user-service.js");
var template = require("./user-center-updata.string");
var userCenterUpdata = {
    init: function() {
        this.onload();
    },
    onload: function() {
        navSide.init({
            name: "user-center"
        });
        this.loadUserInfo();

    },
    bindEvent: function() {
        var _this = this;
        $("#submit").click(function() {
            _this.updataUserInfo();
        });
    },
    loadUserInfo: function() {
        var userInfoHtml = '';
        var _this = this;
        userService.getUserInfo(function(res) {
            console.log(res);
            userInfoHtml = mmUtil.renderHtml(template, res.data);
            $('.panel').html(userInfoHtml);
            // 在加载完成以后进行函数绑定,要注意这个不能写在init那里
            _this.bindEvent();

        }, function(errMsg) {
            mmUtil.errorHint(errMsg);
        });
    },
    updataUserInfo: function() {
        // 更新信息
        var data = {
            email: $("#email").val(),
            phone: $("#phone").val(),
            question: $("#question").val(),
            answer: $("#answer").val(),
        };
        // 验证信息是否合理
        if (this.validate(data).status) {
            userService.updataUserInfo(data, function(res) {
                // 更新成功，返回个人中心
                window.location.href = "./user-center.html"
            }, function(errMsg) {
                mmUtil.errorHint(errMsg);
            });
        } else {
            mmUtil.errorHint("出现错误");
        }
    },
    validate: function(data) {
        var result = {
            status: false,
            msg: ''
        };
        if (!mmUtil.validate(data.phone, "phone")) {
            result.msg = "手机号格式不正确";
            mmUtil.errorHint(result.msg);
            return result;
        };
        if (!mmUtil.validate(data.email, "email")) {
            result.msg = "邮件格式不正确";
            mmUtil.errorHint(result.msg);
            return result;
        };
        if (!mmUtil.validate(data.question, "notEmpty")) {
            alert(1);
            result.msg = "不能为空";
            mmUtil.errorHint(result.msg);
            return result;
        };
        if (!mmUtil.validate(data.answer, "notEmpty")) {
            alert(data.anwser);
            result.msg = "不能为空";
            mmUtil.errorHint(result.msg);
            return result;
        };
        // 通过验证
        result.status = true;
        return result;
    }
}

$(function() {
    userCenterUpdata.init();
})