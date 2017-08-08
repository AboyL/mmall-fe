require("./user-center.css");
var navSide = require("../common/nav-side/nav-side.js")
var mm = require("util/mm.js");
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
            userInfoHtml = mm.renderHtml(template, res.data);
            $('.panel').html(userInfoHtml);
        }, function(errMsg) {
            mm.errorHint(errMsg);
        });
    },
}

$(function() {
    userCenter.init();
})