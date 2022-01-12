import Config from "react-native-config";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  databaseURL: Config.FIREBASE_DB_URL,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  appId: Config.FIREBASE_APP_ID,
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getDatabase(FirebaseApp);
