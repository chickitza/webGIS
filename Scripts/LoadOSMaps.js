var LyrAry;

function addBaseLayer() {
    console.log("add layers");

    var lyr0 = new ol.layer.Tile({
        name: "OSM",
        source: new ol.source.OSM()
    });

    var lyr1 = new ol.layer.Tile({
        name: "天地图影像",
        source: new ol.source.XYZ({
            url: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610"
        })
    });

    var lyr2 = new ol.layer.Tile({
        name: "注记",
        source: new ol.source.XYZ({
            url: "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610"
        })
    });

    LyrAry = [lyr0, lyr1, lyr2];
}

var projection = new ol.proj.Projection({
    code: 'EPSG:4326',
    units: 'degrees',
    axisOrientation: 'neu',
    global: true
});

console.log("dafasdfasdfasdf");

//实例化鼠标位置控件（MousePosition）
var coorFormatTemp = '东经 {x}度, 北纬 {y}度';
var mousePositionControl = new ol.control.MousePosition({
    //坐标格式
    coordinateFormat: ol.coordinate.createStringXY(4),
    //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
    projection: 'EPSG:4326',
    //坐标信息显示样式类名，默认是'ol-mouse-position'
    className: 'custom-mouse-position',
    //显示鼠标位置信息的目标容器
    target: document.getElementById('mouse-position'),
    //未定义坐标的标记
    undefinedHTML: '&nbsp;'
});
//mousePositionControl.setCoordinateFormat(new ol.coordinate.Format);




var map = new ol.Map({
    target: "map",
    layers: [
        new ol.layer.Tile({
            name: "OSM底图",
            source: new ol.source.OSM(),
        })
    ],
    view: new ol.View({
        center: [114, 30],
        projection: projection,
        zoom: 9
    }),
    controls: ol.control.defaults().extend([
        new ol.control.FullScreen(),  //加载全屏显示控件（目前支持非IE内核浏览器）
        new ol.control.ScaleLine(),
        mousePositionControl
    ])
});


addBaseLayer();

map.on('click', function (evt) {
    var coordinate = evt.coordinate;        //鼠标单击点的坐标
    var showCoor = ol.coordinate.toStringHDMS(coordinate);
    //alert(showCoor);

    var params = {
        REQUEST: "GetFeatureInfo",                // WMS GetFeatureInfo
        //BBOX: 113,30,116,32,       // 地图的地图范围
        WIDTH: 780,                     // 地图的宽度
        HEIGHT: 330,                     // 地图高度
        X: coordinate.x,                         // 屏幕坐标X
        Y: coordinate.y,                         // 屏幕坐标X
        QUERY_LAYERS: vectorLayer,    // 定义要查询的图层
        INFO_FORMAT: "text/html",                    // GetFeatureInfo返回格式
        FEATURE_COUNT: 50,                             // 最大返回的Feature个数
        Layers: vectorLayer,                      // WMS 图层列表
        Styles: "",                             // 图层样式
        format: "image/png"                     // 地图格式
        //EXCEPTIONS:     "application/vnd.ogc.se_xml"     // Exception 类型
    };
    //var wms_url = "http://localhost:8080/geoserver/wms";
    WuhanSrc.getFeatureInfoUrl(wms_url, params, this, onComplete, onComplete);
    //ol.Event.stop(evt);

            document.getElementById('info').innerHTML = '';
            var viewResolution = /** @type {number} */ (view.getResolution());
            var url = WuhanSrc.getGetFeatureInfoUrl(
                evt.coordinate, viewResolution, 'EPSG:4326',
                {'INFO_FORMAT': 'text/html'});
            if (url) {
              document.getElementById('info').innerHTML =
                  '<iframe seamless src="' + url + '"></iframe>';
            }
        


});
function onComplete(response) {
    alert(response.responseText);
}





