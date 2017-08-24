require("./nav-side.css");

var mm = require('util/mm.js');
var template = require("./nav-side.string");
var navSide = {
    option: {
        name: '',
        navList: [
            { "name": "user-center", "desc": "个人中心", "href": "./user-center.html" },
            { "name": "order-list", "desc": "我的订单", "href": "./order-list.html" },
            { "name": "user-pass-updata", "desc": "修改密码", "href": "./user-pass-updata.html" },
            { "name": "about", "desc": "关于MMALL", "href": "./about.html" }
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
            } else {
                this.option.navList[i].isActive = false;
            }

        }
        // 渲染html
        var side = mm.renderHtml(template, {
            navList: this.option.navList
        });
        $('.nav-side').html(side);
    }
}

module.exports = navSide;