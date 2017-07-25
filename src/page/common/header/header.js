require("./header.css");

var mmUtil = require('util/mmUtil.js');
var header = {
    init: function() {
        this.bindEvent();
    },
    onLoad: function() {
        var keyword = mmUtil.getUrlParam('keyword');
        // 回填输入框
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    bindEvent: function() {
        var _this = this;
        // 点击搜索提交
        $('#search-btn').click(function() {
            _this.searchSubmit();
        });

        // 回车提交
        $("#search-input").keyup(function(event) {
            // 13是回车
            if (event.keyCode === 13) {
                _this.searchSubmit();

            }
        })
    },
    searchSubmit: function() {
        var keyword = $.trim($('#search-input').val());
        if (keyword) {
            //如果有输入,调整商品页面
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            // 跳回主页
            mmUtil.goHome();
        }
    }
}

header.init();