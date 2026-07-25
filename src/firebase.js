// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAypJreK2ZXSPqglVpxP6OJYVsUvKCnpqg",
  authDomain: "nesa-app-6a502.firebaseapp.com",
  projectId: "nesa-app-6a502",
  storageBucket: "nesa-app-6a502.firebasestorage.app",
  messagingSenderId: "686064056786",
  appId: "1:686064056786:web:cc4a72960ee3397a24f00b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);