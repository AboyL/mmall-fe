require("./result.css");
require("page/common/nav-simple/nav-simple.css");

var mm = require('util/mm.js');

$(function() {
    var type = mm.getUrlParam("type") || "default";
    var $Element = $('.resultCon.' + type + '-success').show();
    if (mm.getUrlParam("type") === "payment") {
        var orderNo = mm.getUrlParam("orderNo");
        $(".order").attr("href", $(".order").attr("href") + orderNo);
    }
});