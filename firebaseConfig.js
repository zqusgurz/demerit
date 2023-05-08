// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyD0p8fkPgeAvevsursBRBHMfZANATYYaCw",
  authDomain: "demerit-meating.firebaseapp.com",
  projectId: "demerit-meating",
  storageBucket: "demerit-meating.appspot.com",
  messagingSenderId: "192507141481",
  appId: "1:192507141481:web:eb97ad73dd4611a07131f8",
  measurementId: "G-XQEQBZ7JN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);