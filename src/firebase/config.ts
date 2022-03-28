import firebase from 'firebase';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.FIREBASE_API_KEY,
  authDomain: Constants.manifest?.extra?.FIREBASE_AUTH_DOMAIN,
  databaseURL: Constants.manifest?.extra?.FIREBASE_DB_URL,
  projectId: Constants.manifest?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: Constants.manifest?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.manifest?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.manifest?.extra?.FIREBASE_APP_ID,
  measurementId: Constants.manifest?.extra?.FIREBASE_MEASUREMENT_ID,
};

export const FirebaseApp = firebase.initializeApp(firebaseConfig);
export const FirebaseAuth = FirebaseApp.auth();
export const FirebaseDB = FirebaseApp.firestore();
export const FirebaseStorage = FirebaseApp.storage();
