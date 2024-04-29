// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <- needed for DB

import { getAuth } from "firebase/auth"; // <- needed for auth (later)

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDm6DXqSWe7lFU0oLS0NpFZ67Oy2cArSv0",
  authDomain: "artofsmile-3a6db.firebaseapp.com",
  projectId: "artofsmile-3a6db",
  storageBucket: "artofsmile-3a6db.appspot.com",
  messagingSenderId: "1088007333876",
  appId: "1:1088007333876:web:579b05402e3a6f44fc7ba1",
  measurementId: "G-WL1M1N77MS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app); // <- needed for auth (later)
 export { auth }

export const db = getFirestore(app); // <- needed for DB so we can use it in our application components