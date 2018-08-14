import * as firebase from 'firebase';

import '../../secrets';

export const FIREBASE_API_KEY = process.env.apiKey;
export const FIREBASE_AUTH_DOMAIN = process.env.authDomain;
export const FIREBASE_DATABASE_URL = process.env.databaseURL;
export const FIREBASE_PROJECT_ID = process.env.projectId;
export const FIREBASE_STORAGE_BUCKET = process.env.storageBucket;
export const FIREBASE_MESSAGING_SENDER_ID = process.env.messagingSenderId;
export const FACEBOOK_APP_ID = process.env.facebookAppId;

// Initialize Firebase
const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();
