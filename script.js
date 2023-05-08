function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
var coordinateFormat = function (coordinate) {
    var hdms = ol.coordinate.toStringHDMS(coordinate); // 地理坐标
    return hdms;
  };

function lengthMeasure(){
    this.setToolbarDisactive();
    this.$refs.length.classList.add("active");
    iSelect.setActive(false);
    measure.measure(this.map,'LineString');

}

var measureTooltipElement;

const formatLength = function (line) {
    const length = ol.sphere.getLength(line);
    var output;
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
    } else {
      output = Math.round(length * 100) / 100 + ' ' + 'm';
    }
    return output;
};

const formatArea = function (polygon) {
    const area = ol.sphere.getArea(polygon);
    var output;
    if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
      output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
    }
    return output;
};

function DrawMeasure() {
    createMeasureTooltip();
    var listener, sketch;
    draw.on('drawstart', function (evt) {
      // set sketch
      sketch = evt.feature;
  
      /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
      var tooltipCoord = evt.coordinate;
  
      listener = sketch.getGeometry().on('change', function (evt) {
        const geom = evt.target;
        var output;
        if (geom instanceof Polygon) {
          output = formatArea(geom);
          tooltipCoord = geom.getInteriorPoint().getCoordinates();
        } else if (geom instanceof LineString) {
          output = formatLength(geom);
          tooltipCoord = geom.getLastCoordinate();
        }
        measureTooltipElement.innerHTML = output;
        measureTooltip.setPosition(tooltipCoord);
      });
    });
  
    draw.on('drawend', function () {
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
      measureTooltip.setOffset([0, -7]);
      // unset sketch
      sketch = null;
      // unset tooltip so that a new one can be created
      measureTooltipElement = null;
      createMeasureTooltip();
      unByKey(listener);
    });
}

function createMeasureTooltip() {
    if (measureTooltipElement) {
      measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    measureTooltipElement.id = 'ol-tooltip ol-tooltip-measure';
    measureTooltip = new ol.Overlay({
      element: measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center',
      stopEvent: false,
      insertFirst: false,
    });
    map.addOverlay(measureTooltip);
}

function  clearmea(){
  var meas = document.getElementsByTagName('div')
  for(var i=0; i<meas.length-1;i++){
    // 遍历所有的div并根据id做判断
    if(meas[i].getAttribute('id') == 'ol-tooltip ol-tooltip-measure'){
      // 对满足条件的标签设置属性即可
        meas[i].remove();
    }
  }
}