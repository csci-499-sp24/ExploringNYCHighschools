import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAROY8GgpA_X1VYEU14SoPB5B6q2kqhBw4",
  authDomain: "capstone-421cb.firebaseapp.com",
  databaseURL: "https://capstone-421cb-default-rtdb.firebaseio.com",
  projectId: "capstone-421cb",
  storageBucket: "capstone-421cb.appspot.com",
  messagingSenderId: "798259213938",
  appId: "1:798259213938:web:0d8f02d77eb62f81b5b4eb",
  measurementId: "G-R1VSKSHFWW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {auth, firestore};