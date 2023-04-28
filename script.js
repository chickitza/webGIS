function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
var coordinateFormat = function (coordinate) {
    var hdms = ol.coordinate.toStringHDMS(coordinate); // 地理坐标
    return hdms;
  };