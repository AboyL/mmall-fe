require("./layout.css");
require("font_awesome/css/font-awesome.min.css");
require("./nav/nav.js");
require("./footer/footer.css");
require("./header/header.js");
var navSide = require("./nav-side/nav-side.js");
navSide.init({
    name: "user-center"
});
// 让所有的链接点开后都是跳到新的页面
$(function() {
    // $(window).load(function() {
    //     $("a").attr("target", "_blank");
    // });
    $(document).on("click", "a", function() {
        $("a").attr("target", "_blank");

    });
});