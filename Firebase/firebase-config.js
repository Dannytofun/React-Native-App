// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXcDDad_0Ygtoe_SwpH-Uio2vL8slOEPM",
  authDomain: "authen-9c2b9.firebaseapp.com",
  projectId: "authen-9c2b9",
  storageBucket: "authen-9c2b9.appspot.com",
  messagingSenderId: "642165141037",
  appId: "1:642165141037:web:9b6ae61aac167e475c52a4",
  measurementId: "G-1RMNRRJ8M5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);