var Uilt = require("util/mmUtil.js");
// netUilt.request({
//     // url: "http://happymmall.com/product/list.do?keyword=1",//不可以
//     url: "/product/list.do?keyword=1", //可以

//     success: function(res) {
//         console.log(res);
//         console.log("success");
//     },
//     error: function(err) {
//         console.log(err);
//     }
// });

// netUilt.getUrlParam("test");
// var htmlTeplate = "<div>{{data}}</div><p>{{ss}}</p>";
// var data = {
//     data: "test",
//     ss: "mm",
// }

console.log(Uilt.validate("    sds_ds_d.sd@qq.com!!!  ", "emaill"))
    // console.log(netUilt.renderHtml(htmlTeplate, data));