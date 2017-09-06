require("./order-detail.css");
var navSide = require("../common/nav-side/nav-side.js")
var mm = require("util/mm.js");
var orderProductService = require("service/order-product-service.js");
var templateList = require("./order-detail.string");
var page = {
    data: {
        orderNo: mm.getUrlParam("orderNo"),
    },
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function() {
        navSide.init({
            name: "order-list"
        });
        this.loadOrderDetail();
    },
    bindEvent: function() {
        var _this = this;
        // 绑定取消订单事件
        $(document).on("click", ".order-cancal", function() {
            if (window.confirm("您真的要取消订单吗")) {
                orderProductService.orderCancal(_this.data.orderNo, function(res) {
                    // 弹出订单取消的消息
                    alert("订单已经取消了")
                    _this.loadOrderDetail();
                }, function(errMsg) {
                    mm.errorHint(errMsg);
                })
            }
        });
    },
    loadOrderDetail: function() {
        var html = "";
        var _this = this;
        orderProductService.getOrderDetail(_this.data.orderNo, function(res) {
            _this.filter(res.data);
            console.log(res.data);
            html = mm.renderHtml(templateList, res.data);
            $(".content").html(html);
        }, function(errMsg) {
            mm.errorHint(errMsg);
        });
    },
    // 判断是否已经付款
    filter: function(data) {
        if (data.statusDesc === "未支付") {
            // 为数据加上未付款
            data.alreadyPay = false;
        } else {
            data.alreadyPay = true;
        }
    }
}

$(function() {
    page.init();
})