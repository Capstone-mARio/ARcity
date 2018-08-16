import { auth, database, provider } from '../firebase';

//Create the user object in realtime database
export function get(callback) {
  const locRef = database.ref().child('locations');
  locRef
    .then((locRef) => callback(true, locRef, null))
    .catch(error => console.log(error));
}

