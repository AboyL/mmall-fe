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
    // 获取购物车列表
    getCartList: function(resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        });
    },
    // 向购物车中添加商品
    addToCart: function(data, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/cart/add.do'),
            data: data,
            success: resolve,
            error: reject
        });
    },
    // 选择
    select: function(productId, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/cart/select.do'),
            data: {
                productId: productId,
            },
            success: resolve,
            error: reject
        });
    },
    // 移除选择
    unselect: function(productId, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/cart/un_select.do'),
            data: {
                productId: productId,
            },
            success: resolve,
            error: reject
        });
    },
    // 全选
    selectAll: function(resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/cart/select.do'),
            success: resolve,
            error: reject
        });
    },
    // 移除选择
    unselectAll: function(resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/cart/un_select.do'),
            success: resolve,
            error: reject
        });
    },
    // 更新数据
    updateCount: function(data, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/cart/update.do'),
            data: data,
            success: resolve,
            error: reject
        });
    },
    // 删除
    deleteProduct: function(productIds, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/cart/delete_product.do'),
            data: {
                productIds: productIds
            },
            success: resolve,
            error: reject
        });
    },
}
module.exports = cart_service;