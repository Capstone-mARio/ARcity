var targets = [
 { //starbucks
   latitude: 40.740478,
   longitude: -73.9794524,
   x: 0,
   y: 0,
   id: 1
 },

 { //killarney rose
   latitude: 40.740476,
   longitude: -73.9794520,
   x: 0,
   y: 0,
   id: 2
 },

 { //suitcase
   latitude: 40.740476,
   longitude: -73.9794520,
   x: 0,
   y: 0,
   id: 3
 },

 { //coin
   latitude: 40.740476,
   longitude: -73.9794520,
   x: 0,
   y: 0,
   id: 3
 },

 { //coin
   latitude: 40.70467766021233,
   longitude: -74.00904218840344,
   x: 0,
   y: 0,
   id: 3
 },

 { //coin
   latitude: 40.70467766023443,
   longitude: -74.00904218750554,
   x: 0,
   y: 0,
   id: 3
 },

 { //coin
   latitude: 40.70467766034543,
   longitude: -74.00904263240554,
   x: 0,
   y: 0,
   id: 3
 },

 { //coin
   latitude: 40.70467766023443,
   longitude: -74.00904218853554,
   x: 0,
   y: 0,
   id: 4
 },

 { //coin
   latitude: 40.70467766026443,
   longitude: -74.00904218845354,
   x: 0,
   y: 0,
   id: 4
 },

 { //coin
   latitude: 40.70467766443543,
   longitude: -74.0090421889554,
   x: 0,
   y: 0,
   id: 4
 },

 { //coin
   latitude: 40.70467766023543,
   longitude: -74.00904218845754,
   x: 0,
   y: 0,
   id: 4
 },

 { //coin
   latitude: 40.70467766683543,
   longitude: -74.00904218840554,
   x: 0,
   y: 0,
   id: 4
 },

 { //coin
   latitude: 40.70467765765543,
   longitude: -74.00904218840554,
   x: 0,
   y: 0,
   id: 4
 },

 { //coin
   latitude: 40.70467766025673,
   longitude: -74.00904218840554,
   x: 0,
   y: 0,
   id: 4
 },

 { //coin
   latitude: 40.70467766026753,
   longitude: -74.00904218840554,
   x: 0,
   y: 0,
   id: 4
 },

 { //coin
   latitude: 40.70467766028793,
   longitude: -74.00904218840554,
   x: 0,
   y: 0,
   id: 4
 },

 { //coin
   latitude: 40.70467766025673,
   longitude: -74.009042188465454,
   x: 0,
   y: 0,
   id: 4
 },

 { //coin
   latitude: 40.70467766027643,
   longitude: -74.00904218844554,
   x: 0,
   y: 0,
   id: 4
 },

 { //coin
   latitude: 40.70467766012543,
   longitude: -74.00904218842354,
   x: 0,
   y: 0,
   id: 4
 },

 { //coin
   latitude: 40.70467766025233,
   longitude: -74.00904218230554,
   x: 0,
   y: 0,
   id: 4
 },

 { //coin
   latitude: 40.70467766025343,
   longitude: -74.00904218840554,
   x: 0,
   y: 0,
   id: 4
 },

 { //coin
   latitude: 40.70467766025453,
   longitude: -74.00904216540564,
   x: 0,
   y: 0,
   id: 4
 },

 { //coin
   latitude: 40.704677660255434,
   longitude: -74.00904218823554,
   x: 0,
   y: 0,
   id: 4
 }
];

// {latitude: 40.7051,longitude: -74.0087,x: 0,y: 0,id: 2}

let location = {}
let targetLocation = {}

for (let i = 0; i < targets.length; i++) {
  const targetXY = getXY(targets[i].latitude, targets[i].longitude)
  targets[i].x = targetXY.x;
  targets[i].y = targetXY.y;
}

function getXY(lat, lon) {
  let lon_rad = (lon / 180.0 * Math.PI)
  let lat_rad = (lat / 180.0 * Math.PI)
  const sm_a = 6378137.0
  let x = sm_a * lon_rad
  let y = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))

  return { x, y }
}

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

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

export { getXY, targets };
