mm = require("../util/mm.js");

var pay_service = {
    // 获取购物车数量
    pay: function(orderNo, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        });
    },
    // 获取订单状态
    getOrderStatus: function(orderNo, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        });
    },

}
module.exports = pay_service;