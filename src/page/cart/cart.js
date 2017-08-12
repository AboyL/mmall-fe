require("./cart.css");
var mm = require("util/mm.js");
var cartService = require("service/cart-service.js");
var nav = require("../common/nav/nav.js");
var template = require("./cart.string");
var page = {
    data: {

    },
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function() {
        this.loadCart();
    },
    bindEvent: function() {
        var _this = this;
        // 如果我们选择了某个商品或者不选 
        _this.select(_this);
        // 全选
        _this.selectAll(_this);
        // 绑定更新
        _this.updateCount(_this);
        // 绑定删除事件
        _this.deleteCartProduct(_this);
        // 绑定删除选中事件
        _this.deleteCheckedProduct(_this);
        // 提交
        _this.submit(_this);
    },
    loadCart: function() {
        var _this = this;
        cartService.getCartList(function(res) {
            var html = '';
            html = mm.renderHtml(template, res.data);
            $(".cart").html(html);
            nav.loadCartInfo();
            _this.data = res.data;
        }, function(errMsg) {
            mm.errorHint(errMsg);
        })
    },
    // 选择所有
    select: function(_this) {
        $(document).on("click", ".c-select", function() {
            var $this = $(this).children("input"); //把事件转换到我们的真正的触发上面来
            var productId = $this.parents(".list-item").data("product-id");
            // 判断是不是选择状态
            if ($this.is(":checked")) {
                cartService.select(productId, function(res) {
                    // 重新渲染一次页面
                    _this.loadCart();
                }, function(errMsg) {
                    mm.errorHint(errMsg);
                })
            } else {
                // 现在是选中了，所以要不选中
                cartService.unselect(productId, function(res) {
                    // 重新渲染一次页面
                    _this.loadCart();
                }, function(errMsg) {
                    mm.errorHint(errMsg);
                })

            }
        });
    },
    // 选择所有
    selectAll: function(_this) {
        $(document).on("click", ".c-select-all", function() {
            var $this = $(this).children("input"); //把事件转换到我们的真正的触发上面来
            // 判断是不是选择状态
            if ($this.is(":checked")) {
                cartService.selectAll(function(res) {
                    // 重新渲染一次页面
                    _this.loadCart();
                }, function(errMsg) {
                    mm.errorHint(errMsg);
                })
            } else {
                // 现在是选中了，所以要不选中
                cartService.unselectAll(function(res) {
                    // 重新渲染一次页面
                    _this.loadCart();
                }, function(errMsg) {
                    mm.errorHint(errMsg);
                })

            }
        });
    },
    // 更新数据
    updateCount: function(_this) {
        // 给按钮进行事件绑定
        $(document).on("click", ".c-number .c-btn", function() {

            var $this = $(this),
                count = $this.siblings("input").val(),
                productId = $this.parents(".list-item").data("product-id"),
                min = 1,
                max = $this.siblings("input").data("max"),
                newCount = 0,
                updateInfo = {
                    productId: productId,
                    count: count
                },
                type = $this.hasClass("add") ? "add" : "minus";
            if (type === "add") {
                newCount = count + 1;
                if (newCount > max) {
                    return;
                } else {
                    // 修改数据
                    ++count;
                    updateInfo.count = count;
                    cartService.updateCount(updateInfo, function(res) {
                        // 重新渲染页面
                        _this.loadCart();
                    }, function(errMsg) {
                        mm.errorHint(errMsg);
                    })
                }
            } else {
                newCount = count - 1;
                if (newCount < min) {
                    return;
                } else {
                    // 修改数据
                    --count;
                    updateInfo.count = count;
                    cartService.updateCount(updateInfo, function(res) {
                        // 重新渲染页面
                        _this.loadCart();

                    }, function(errMsg) {
                        mm.errorHint(errMsg);
                    })
                }
            }
        })
    },
    // 删除
    deleteCartProduct: function(_this) {
        $(document).on("click", ".delete", function() {
            var $this = $(this);
            // 弹出一个提示框确认删除
            if (window.confirm("确认要删除吗")) {
                cartService.deleteProduct(productId, function(res) {
                    // 重新渲染页面
                    _this.loadCart();

                }, function(errMsg) {
                    mm.errorHint(errMsg);
                })
            } else {
                return;
            }
        })
    },
    // 删除选中项
    deleteCheckedProduct: function(_this) {
        $(document).on("click", ".delete-checked", function() {
            var $this = $(this);
            // 弹出一个提示框确认删除
            if (window.confirm("确认要删除选中项吗")) {

                // 取到所有的选中的项目的id
                var checkedProduct = $(".c-select input:checked").parents(".list-item");
                console.log(checkedProduct);
                var cpIds = [];
                console.log(checkedProduct.length);
                for (var i = 0; i < checkedProduct.length; i++) {
                    cpIds.push(checkedProduct.eq(i).data("product-id"));
                }
                // 把数组从数组变成字符串
                cpIds = cpIds.join(",");
                // 提交
                cartService.deleteProduct(cpIds, function(res) {
                    // 重新渲染页面
                    _this.loadCart();

                }, function(errMsg) {
                    mm.errorHint(errMsg);
                })
            } else {
                return;
            }
        })
    },
    // 进行提交
    submit: function(_this) {
        $(document).on("click", ".submit", function() {
            if (window.confirm("确定要提交吗")) {
                // 把输出提交到订单页
                var data = _this.data;
                console.log(_this.data);
                if (data.cartTotalPrice > 0) {
                    // 大于0才提交。跳转页面
                    window.location.href = "./comfirm.html"
                }
            }
        })
    }
}
$(function() {
    page.init();
})