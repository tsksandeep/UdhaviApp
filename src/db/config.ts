import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAZcO7i_YGU34iktBMlZYRnwUTlJHCjKTo",
  authDomain: "thagaval-dbd6f.firebaseapp.com",
  databaseURL: "https://thagaval-dbd6f-default-rtdb.firebaseio.com",
  projectId: "thagaval-dbd6f",
  storageBucket: "thagaval-dbd6f.appspot.com",
  messagingSenderId: "670329321676",
  appId: "1:670329321676:web:a2e5423d7c2a1e7602ea69",
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getDatabase(FirebaseApp);
