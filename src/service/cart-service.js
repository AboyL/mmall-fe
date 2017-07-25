mmUtil = require("../util/mmUtil.js");

var cart_service = {
    // 获取购物车数量
    getCartCount: function(resolve, reject) {
        mmUtil.request({
            url: mmUtil.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    }
}

module.exports = cart_service;