// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAROY8GgpA_X1VYEU14SoPB5B6q2kqhBw4",
    authDomain: "capstone-421cb.firebaseapp.com",
    projectId: "capstone-421cb",
    storageBucket: "capstone-421cb.appspot.com",
    messagingSenderId: "798259213938",
    appId: "1:798259213938:web:0d8f02d77eb62f81b5b4eb",
    measurementId: "G-R1VSKSHFWW"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth }
// export default firebaseApp;
