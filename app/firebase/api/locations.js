import { auth, database, provider } from '../firebase';

//Create the user object in realtime database
export async function get(district, callback) {
  try {
    let districtObjects = [];
    const locRef = await database.ref().child('locations').child(district);
    locRef.once("value", snapshot => {
      snapshot.forEach(child => {
        districtObjects.push(child.val());
      })
    })
    .then(() => callback(true, districtObjects, null))
  } catch (err) {
    console.error(err);
  }
}

export async function post(district, location, callback) {
  try {
    const locRef = await database.ref().child('locations').child(district);
    const snap = await locRef.push();
    await locRef.child(snap.key)
      .update({...location});
    callback(true, location, null);
  } catch (err) {
    console.error(err);
  }
}
