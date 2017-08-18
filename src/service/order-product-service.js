mm = require("../util/mm.js");

var page = {
    // 得到当前产品清单
    getInventory: function(resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/order/get_order_cart_product.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 创建一个订单
    createOrder: function(data, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/order/create.do'),
            data: data,
            success: resolve,
            error: reject
        });
    },
    // 获取订单列表
    getProductList: function(data, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/order/list.do'),
            data: data,
            success: resolve,
            error: reject
        });
    },
    // 获取订单详情
    getOrderDetail: function(orderNo, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/order/detail.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        });
    },
    // 取消订单
    orderCancal: function(orderNo, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/order/cancel.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        });
    },

}

module.exports = page;