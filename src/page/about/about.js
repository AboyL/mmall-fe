require("./about.css");
var navSide = require("../common/nav-side/nav-side.js")
var page = {
    init: function() {
        this.onload();
    },
    onload: function() {
        navSide.init({
            name: "about"
        });
        this.loadOrderList();
    }
}
$(function() {
    page.init();
})