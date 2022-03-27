// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjGvSvxNYTnYUCRTRCE2sSD6He8hgBmUQ",
  authDomain: "simulate-exchange.firebaseapp.com",
  projectId: "simulate-exchange",
  storageBucket: "simulate-exchange.appspot.com",
  messagingSenderId: "137043782079",
  appId: "1:137043782079:web:6c83eea2f59ea7eb8d590a",
  measurementId: "G-FPV5HRNJCX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
