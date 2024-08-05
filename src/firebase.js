// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE3ewXetE4NVIDg9D-1f061pnXjf5s8go",
  authDomain: "filmebi-79c29.firebaseapp.com",
  projectId: "filmebi-79c29",
  storageBucket: "filmebi-79c29.appspot.com",
  messagingSenderId: "654032154707",
  appId: "1:654032154707:web:09382ce7fb3549620e16a6",
  measurementId: "G-C5R21C8MZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;