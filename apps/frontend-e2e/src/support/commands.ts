import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { attachCustomCommands } from "cypress-firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCjGvSvxNYTnYUCRTRCE2sSD6He8hgBmUQ",
  authDomain: "simulate-exchange.firebaseapp.com",
  projectId: "simulate-exchange",
  storageBucket: "simulate-exchange.appspot.com",
  messagingSenderId: "137043782079",
  appId: "1:137043782079:web:6c83eea2f59ea7eb8d590a",
  measurementId: "G-FPV5HRNJCX",
};

firebase.initializeApp(firebaseConfig);
attachCustomCommands({ Cypress, cy, firebase });

// Cypress.Commands.add('dataCy', (value) => {
//   return cy.get(`[data-cy=${value}]`);
// });
