require("./result.css");
require("page/common/nav-simple/nav-simple.css");

var mm = require('util/mm.js');

$(function() {
    var type = mm.getUrlParam("type") || "default";
    // var $Element = $('.' + type + '-success').show();
    var $Element = $('.resultCon.' + type + '-success').show();
})