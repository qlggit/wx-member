function gcjToBd(lat , lon){
  //火星转百度
  var x = lat, y = lon;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * Math.PI);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * Math.PI);
  var bd_lon = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  return [bd_lat , bd_lon];
}
var isLocation;
WY.ready('wx-location-wgs84',function(res){
  if(!isLocation)WY.map(res.latitude , res.longitude);
  isLocation = 1;
});
WY.map = function(lat , lon , type){
  //var newPoint = gcjToBd(lat , lon);
  var myGeo = new BMap.Geocoder();
  myGeo.getLocation(new BMap.Point(lon , lat), function(result){
    console.log('BMap getLocation');
    console.log(result);
    WY.ready('bmap-location' , result);
  });
};
