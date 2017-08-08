mm = require("../util/mm.js");

var product_service = {

    // 获取商品列表
    getProductList: function(data, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/product/list.do'),
            data: data,
            success: resolve,
            error: reject
        });
    },
    // 获取商品详细信息
    getDetailInfo: function(data, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/product/detail.do'),
            data: data,
            success: resolve,
            error: reject
        });
    },
}

module.exports = product_service;