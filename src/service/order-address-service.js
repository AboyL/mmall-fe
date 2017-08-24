mm = require("../util/mm.js");

var page = {
    //得到地址列表
    getAddressList: function(resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 获得选中地址
    getAddress: function(addressInfo, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/shipping/select.do'),
            data: addressInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 添加新地址
    addAddress: function(addressInfo, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 更新收货地址
    updateAddress: function(addressInfo, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 删除地址
    deleteAddress: function(addressInfo, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/shipping/del.do'),
            data: addressInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
}

module.exports = page;