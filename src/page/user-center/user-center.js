require("./user-center.css");
var navSide = require("../common/nav-side/nav-side.js")
var mmUtil = require("util/mmUtil.js");
var userService = require("service/user-service.js");
var template = require("./user-center.string");
var userCenter = {
    init: function() {
        this.onload();
    },
    onload: function() {
        navSide.init({
            name: "user-center"
        });
        this.loadUserInfo();
    },
    loadUserInfo: function() {
        var userInfoHtml = '';
        userService.getUserInfo(function(res) {
            console.log(res);
            userInfoHtml = mmUtil.renderHtml(template, res.data);
            $('.panel').html(userInfoHtml);
        }, function(errMsg) {
            mmUtil.errorHint(errMsg);
        });
    },
}

$(function() {
    userCenter.init();
})