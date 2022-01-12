import Constants from "expo-constants";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

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

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getDatabase(FirebaseApp);
