/**
 * Created by yubh on 2018/3/9.
 */
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//
// (function (e, d) {
//   var c = e.documentElement;
//   var a = "orientationchange" in window ? "orientationchange" : "resize";
//   var b = function () {
//     var f = c.clientWidth;
//     if (!f) {
//       return
//     }
//     c.style.fontSize = 100 * (f / 375) + "px"
//   };
//   d.addEventListener(a, b, false);
//   e.addEventListener("DOMContentLoaded", b, false)
// })(document, window);
