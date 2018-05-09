(function (doc,win) {
  var docEle = doc.documentElement;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var recalc = function (){
    var width = docEle.clientWidth;
    if(!width)return;
    docEle.style.fontSize = 100 * (width / 375) + 'px';
  }
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document,window);
