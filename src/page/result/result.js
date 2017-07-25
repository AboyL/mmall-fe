require("./result.css");
require("page/common/nav-simple/nav-simple.css");

var mmUtil = require('util/mmUtil.js');

$(function() {
    var type = mmUtil.getUrlParam("type") || "default";
    // var $Element = $('.' + type + '-success').show();
    var $Element = $('.resultCon.' + type + '-success').show();
})