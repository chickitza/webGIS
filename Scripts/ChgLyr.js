



function changeLayer(index) {
    //获取所选底图的索引
    console.log("changing layer"+index);
    var baselayerindex = index;
    //从地图中取图层组
    var group = map.getLayerGroup();
    //0索引为底图，将底图换成新的底图
    group.values_.layers.array_[0] = LyrAry[index];
    //group.values_.layers.array_[1] = LayerArr[baselayerindex + 3];
    //将图层组重新设置到map
    map.setLayerGroup(group);
    //刷新地图，不可省，否则无法看到变更后的底图

    loadLayersControl(map, "layerControl");    
    map.renderSync();
}

function callServlet(){
    var f=document.forms[0];
    f.action='localhost:8081/s01/serv01?uname=haha';
    f.submit();
    // var value=window.open("localhost:8081/s01/serv01?uname=haha");
    //alert(value);

}


