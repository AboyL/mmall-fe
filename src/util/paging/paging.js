require("./paging.css");
var template = require("./paging.string");
var mm = require("util/mm.js");
paging = function(pagingData) {
    // 如果没有商品或者只有一页,则不显示分页器
    if (pagingData.pages <= 1) {
        return;
    }
    this.pageRange = 3; //显示的范围
    // 获得显示页数
    pagingData.list = [];
    for (var i = pagingData.pageNum - this.pageRange; i <= pagingData.pageNum + this.pageRange; i++) {
        // 前面没有了或者后面没有了
        if (i <= 0 || i > pagingData.pages) {
            continue;
        }

        //  给当前的选择加上active类
        if (pagingData.pageNum === i) {
            pagingData.list.push({
                value: i,
                active: true
            });
        } else {
            pagingData.list.push({
                value: i
            });
        }
    }

    var pagingHtml = mm.renderHtml(template, pagingData);
    $(".paging").html(pagingHtml);

    // 绑定事件
    $(".paging-item").click(function(e) {
        var $this = $(this);
        if ($this.hasClass("disabled") || $this.hasClass("active")) {
            retrun;
        } else {
            pagingData.onselect($this.data("value"));
        }
    })
}

module.exports = paging;