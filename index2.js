// 设置元素显隐
const toggleHide = (id, isHide) => {
  const display = isHide ? 'none' : 'block';
  document.getElementById(id).style.display = display;
}

let locating = false;
let lnglat = {};
let address = '';

layui.use('layer', function () {
  const layer = layui.layer;

  // 获取定位
  const getLocation = () => {
    if (locating) return;
    toggleHide('loading', false);
    locating = true;
    const geolocation = new BMapGL.Geolocation();
    geolocation.getCurrentPosition(function(r){
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        const mk = new BMapGL.Marker(r.point);
        const myGeo = new BMapGL.Geocoder();
        myGeo.getLocation(r.point, function(result){
          if (result) {
            toggleHide('loading', true);
            lnglat = r.point;
            address = result.address;
            layer.msg(`获取定位成功！${address}`);
          }
        });
      }
      else {
        toggleHide('loading', true);
      }
      locating = false;
    });
  }

  getLocation();
});