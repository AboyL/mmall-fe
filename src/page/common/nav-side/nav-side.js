require("./nav-side.css");

var mmUtil = require('util/mmUtil.js');
var template = require("./nav-side.string");
var navSide = {
    option: {
        name: '',
        navList: [
            { "name": "user-centent", "desc": "个人中心", "herf": "./user-center.html" },
            { "name": "order-navList", "desc": "我的订单", "herf": "./order-navList.html" },
            { "name": "user-pass-updata", "desc": "修改密码", "herf": "./user-pass-updata.html" },
            { "name": "about", "desc": "关于MMALL", "herf": "./about.html" }
        ]
    },
    init: function(option) {
        $.extend(this.option, option);
        this.renderNavSide();
    },
    // 渲染导航菜单
    renderNavSide: function() {
        //确定active
        for (var i = 0, l = this.option.navList.length; i < l; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
                console.log(i);
            }

        }
        // 渲染html
        var side = mmUtil.renderHtml(template, {
            navList: this.option.navList
        });
        $('.nav-side').html(side);
    }
}

module.exports = navSide;