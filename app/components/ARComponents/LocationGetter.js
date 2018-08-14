
var target = {
  latitude: 40.70467766025543,
  longitude: -74.00904218848154
};

let location = {}
let targetLocation = {}

// function success(pos) {
//   var crd = pos.coords;
//   location['latitude'] = crd.latitude;
//   location['longitude'] = crd.longitude;
//   location['accuracy'] = crd.accuracy;

//   // console.log('Your current position is:');
//   // console.log(`Latitude : ${crd.latitude}`);
//   // console.log(`Longitude: ${crd.longitude}`);
//   // console.log(`More or less ${crd.accuracy} meters.`);
//   const XY = getXY(crd.latitude, crd.longitude)
//   location['x'] = XY.x;
//   location['y'] = XY.y;
// }

const targetXY = getXY(target.latitude, target.longitude)
targetLocation['x'] = targetXY.x;
targetLocation['y'] = targetXY.y;

function getXY(lat, lon){
  let lon_rad = (lon/ 180.0 * Math.PI)
  let lat_rad = (lat / 180.0 * Math.PI)
  const sm_a = 6378137.0
  let x = sm_a * lon_rad
  let y = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))

  return {x, y}
}

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

module.exports = { getXY, targetLocation};
