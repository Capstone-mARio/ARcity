import * as firebase from 'firebase';

export const FIREBASE_API_KEY = "AIzaSyADLi-pKUarxVg0seTcXCiJTDXO4-jlCcY";
export const FIREBASE_AUTH_DOMAIN = "my-demo-5c233.firebaseapp.com";
export const FIREBASE_DATABASE_URL = "https://my-demo-5c233.firebaseio.com";
export const FIREBASE_PROJECT_ID = "my-demo-5c233";
export const FIREBASE_STORAGE_BUCKET = "my-demo-5c233.appspot.com";
export const FIREBASE_MESSAGING_SENDER_ID = "381597784037";
export const FACEBOOK_APP_ID = "671975379823740";

// Initialize Firebase
const config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();
