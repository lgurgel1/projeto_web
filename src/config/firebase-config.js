// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmhkEONdUerh53Vw27X4AdY1YKFvCNer8",
  authDomain: "star-limoeiro-hotel.firebaseapp.com",
  projectId: "star-limoeiro-hotel",
  storageBucket: "star-limoeiro-hotel.firebasestorage.app",
  messagingSenderId: "1097196097408",
  appId: "1:1097196097408:web:301cbced3a6939d70ebb65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

