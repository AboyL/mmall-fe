mm = require("../util/mm.js");

var cart_service = {
    // 获取购物车数量
    getCartCount: function(resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    },
    addToCart: function(data, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/cart/add.do'),
            data: data,
            success: resolve,
            error: reject
        });
    },
}

module.exports = cart_service;