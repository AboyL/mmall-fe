require("./detail.css");
var navSide = require("../common/nav-side/nav-side.js");
var mm = require("util/mm.js");
var productService = require("service/product-service.js");
var cartService = require("service/cart-service.js")
var template = require("./detail.string");

var page = {
    data: {
        productId: mm.getUrlParam("productId")
    },
    init: function() {
        this.load();
        this.bindEvent();
    },
    load: function() {
        _this = this;
        productService.getDetailInfo({
            productId: _this.data.productId
        }, function(res) {
            // 渲染模版
            _this.loadDetail(res.data);
            _this.data.data = res.data;

        }, function(errMsg) {
            alert(errMsg)
        })
    },
    bindEvent: function() {
        // 放在小图显示大图
        // 用document代理来避免在页面还没有加载成功的时候事件绑定不成功
        var _this = this;
        $(document).on("mouseenter", ".s-img", function() {
            var imgUrl = $(this).attr("src");
            $(".m-img").attr("src", imgUrl);
        });
        // 绑定添加减少按钮事件
        $(document).on("click", ".Cbtn", function() {
            var type = $(this).hasClass("add") ? "add" : "minus";
            var stock = _this.data.data.stock,
                count = $("#count").val();
            if (type === "add") {
                // 如果有足够的货
                if (count < stock) {
                    count++;
                    $("#count").val(count);
                }
            } else if (type === "minus") {
                // 最少为1
                if (count > 1) {
                    count--;
                    $("#count").val(count);
                }
            }
        });
        // 给提交按钮绑定事件
        $(document).on("click", ".submit", function() {
            cartService.addToCart({
                productId: _this.data.productId,
                count: $("#count").val()
            }, function(res) {
                // alert(1);
                window.location.href = "./result.html?type=add-cart";
            }, function(errMsg) {
                mm.errorHint(errMsg);
            })
        });
    },
    loadDetail: function(data) {
        var html = '';
        // 因为传入的data的subImages不是数组,我们把他变成数组
        data.subImages = data.subImages.split(",");
        // 进行渲染
        html = mm.renderHtml(template, data);
        $(".page-wrap").html(html);

    }
}

$(function() {
    page.init();

})