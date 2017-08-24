require("./index.css");
var mm = require("util/mm.js");
var tepalateBanner = require("./banner.string");
// var tepalateBanner = require("./banner2.string");
require("util/slider/index.js");

$(function() {
    bannerHmtl = mm.renderHtml(tepalateBanner);
    $(".banner-con").html(bannerHmtl);
    var unslider = $('.banner').unslider({
        dots: true
    });
    $('.unslider-arrow').click(function() {
        var fn = this.className.split(' ')[1];

        //  Either do unslider.data('unslider').next() or .prev() depending on the className
        unslider.data('unslider')[fn]();
    });
});