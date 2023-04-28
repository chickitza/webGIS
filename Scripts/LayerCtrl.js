//map中的图层数组
var layer = new Array();
//图层名称数组
var layerName = new Array();
//图层可见属性数组
var layerVisibility = new Array();

/**
* 加载图层列表数据
* @param {ol.Map} map 地图对象
* @param {string} id 图层列表容器ID
*/
function loadLayersControl(map, id) {
    //图层目录容器
    var treeContent = document.getElementById(id);
    //var listEle = document.getElementById('lyrlist');
    var layers = map.getLayers();
    for (var i = 0; i < layers.getLength(); i++) {
        var layerC = document.getElementById('lyrlist'+i);
        if (layerC!=null) treeContent.removeChild(layerC);
    }
        // if (lyrTree.getLength()>0)
    // {
    //     for (let index = 0; index < lyrTree.getLength(); index++) {
    //         lyrTree.removeChild(lyrTree.childNodes[index]);
            
    //     }
    // }
    
    //获取地图中所有图层
    for (var i = 0; i < layers.getLength(); i++) {
        //获取每个图层的名称、是否可见属性
        layer[i] = layers.item(i);
        layerName[i] = layer[i].get('name');
        layerVisibility[i] = layer[i].getVisible();
        console.log(layerName[i] + "----" + i);
        //新增li元素，用来承载图层项
        var elementLi = document.createElement('li');
        elementLi.id = 'lyrlist'+i;
        // 添加子节点
        treeContent.appendChild(elementLi);
        //创建复选框元素
        var elementInput = document.createElement('input');
        elementInput.type = "checkbox";
        elementInput.name = "layers";
        elementLi.appendChild(elementInput);
        //创建label元素
        var elementLable = document.createElement('label');
        elementLable.className = "layer";
        //设置图层名称
        setInnerText(elementLable, layerName[i]);
        elementLi.appendChild(elementLable);
        //设置图层默认显示状态
        if (layerVisibility[i]) {
            elementInput.checked = true;
        }
        //为checkbox添加变更事件
        addChangeEvent(elementInput, layer[i]);  
    }
}
/**
* 动态设置元素文本内容（兼容）
*/
function setInnerText(element, text) {
    if (typeof element.textContent == "string") {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}

function addChangeEvent(element, layer) {
    element.onclick = function () {
        if (element.checked) {
            //显示图层
            layer.setVisible(true);
        }
        else {
            //不显示图层
            layer.setVisible(false); 
        }
    };
}




