// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <- needed for DB


import { getAuth } from "firebase/auth"; // <- needed for auth (later)

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4PmdJdvEoiX9EM_fzGB6vUeKZxsJY37M",
  authDomain: "dentalclinic-2d698.firebaseapp.com",
  projectId: "dentalclinic-2d698",
  storageBucket: "dentalclinic-2d698.appspot.com",
  messagingSenderId: "757237796830",
  appId: "1:757237796830:web:b4148d1f1c09ee588c174f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const analytics = getAnalytics(app);

const auth = getAuth(app); // <- needed for auth (later)
 export { auth }

export const db = getFirestore(app); // <- needed for DB so we can use it in our application components