// GeoServer自发布图层
var WuhanSrc = new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/WuhanDEMO/wms",
    params: {
        "LAYERS": 'WuhanDEMO:wh4326',
    }
});
var WuhanLayer = new ol.layer.Tile({
    name: "武汉简图",
    source: WuhanSrc
});
map.addLayer(WuhanLayer);

// 磁盘GeoJson文件图层，带样式渲染
var vectorLayer = new ol.layer.Vector({
    name: "武汉区划图",
    opacity: 0.8,//透明度
    source: new ol.source.Vector({
        url: "GeoJson/AreaWH.geojson",
        format: new ol.format.GeoJSON()
    }),
    style: function (feature, resolution) {
        var id = feature.get("PAC");//获取各个个体编号
        id = id/1000000;
        id = id%5;
        var thisText = feature.get("NAME");//获取各个个体的名字
        var style = null;
        var colors = new Array("#ffff66", "#ff66ff", "#66ffff", "66ff00", "#0066ff");
        {
            style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: colors[id],
                }),
                stroke: new ol.style.Stroke({
                    color: "#555555",
                    width: 1
                }),
                text: new ol.style.Text({
                    text: thisText,//文本
                    ont: '20px SimHei',	//字体大小和字体            
                    fill: new ol.style.Fill({//文字填充颜色
                        color: '#000000'
                    })
                })
            });
        }
        return [style];
    }

});
map.addLayer(vectorLayer);

// 交互数据临时存储图层
var drawSource = new ol.source.Vector({wrapX: false});
var drawLayer = new ol.layer.Vector({
    name: "绘制图层",
    source: drawSource
});
map.addLayer(drawLayer);
// 交互绘制图层
var draw = new ol.interaction.Draw({
    source: drawSource,
    type: "LineString"
});
//map.addInteraction(draw);

// 更新图层管理
loadLayersControl(map, "layerControl");
