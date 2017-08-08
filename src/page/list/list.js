require("./list.css");
var navSide = require("../common/nav-side/nav-side.js")
var mm = require("util/mm.js");
var productService = require("service/product-service.js");
var template = require("./list.string");
var paging = require("util/paging/paging.js");

page = {
    data: {
        listParam: {
            categoryId: mm.getUrlParam("categoryId") || '',
            keyword: mm.getUrlParam("keyword") || '',
            pageNum: mm.getUrlParam("pageNum") || 1,
            pageSize: mm.getUrlParam("pageSize") || 3,
            orderBy: mm.getUrlParam("orderBy") || 'default',

        }
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadList();

    },
    bindEvent: function() {
        var _this = this;
        // 排序按钮的点击事件
        $(".sort-item").click(function() {
            _this.sortEvent($(this));
        });
    },
    loadList: function() {
        var _this = this;
        // 如果我们的keyword和id不匹配,就容易出现问题，删除其中一个
        this.data.listParam.keyword === '' ? delete this.data.listParam.keyword :
            delete this.data.listParam.categoryId;
        // 获取商品列表
        productService.getProductList(this.data.listParam, function(res) {
            var listHtml = '';
            listHtml = mm.renderHtml(template, res.data);
            $(".list").html(listHtml);
            // 渲染出分页器
            var pagingData = {
                pageNum: res.data.pageNum, //当前页数
                pages: res.data.pages, //总共多少页
                firstPage: res.data.firstPage,
                prePage: res.data.prePage,
                nextPage: res.data.nextPage,
                lastPage: res.data.lastPage,
                navigatepageNums: res.data.navigatepageNums,
                onselect: function(value) {
                    _this.data.listParam.pageNum = value;
                    _this.loadList();
                }
            }
            _this.loadPaging(pagingData);

        }, function(errMsg) {
            mm.errorHint(errMsg);
        })
    },
    sortEvent: function(t) {
        // 这里面的this是page
        var $this = t;
        // 点击以后传入第一页的数据
        this.data.pageNum = 1;
        // 点击了默认的按钮
        if ($this.data("type") === "default") {
            // 先判断是不是active
            if ($this.hasClass("active")) {
                // do nothing
                return;
            } else {
                // 添加active并删除其他的active
                $this.addClass("active").siblings(".sort-item").
                removeClass("active desc asc");
                // 设置排序方式为default
                this.data.listParam.orderBy = "default";
            }
        } else if ($this.data("type") === "price") {
            // 加上active处理
            $this.addClass("active").siblings(".sort-item").
            removeClass("active desc asc");
            // 判断现在是升序还是降序第一次点击应该是升序
            if (!$this.hasClass("asc")) {
                $this.addClass("asc").removeClass("desc");
                this.data.listParam.orderBy = "price_asc";
            } else if (!$this.hasClass("desc")) {
                $this.addClass("desc").removeClass("asc");
                this.data.listParam.orderBy = "price_desc";
            }
        }
        // 重新加载页面
        this.loadList();
        console.log(this.data);
    },
    loadPaging: function(data) {
        // console.log(data.nextPage);
        this.paging = new paging(data);
    }
};

$(function() {
    page.init();
});