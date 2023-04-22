// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ3BEnVqamK4RJXDRrpF1jl22a2pRuohw",
  authDomain: "filmyverse-8a9a1.firebaseapp.com",
  projectId: "filmyverse-8a9a1",
  storageBucket: "filmyverse-8a9a1.appspot.com",
  messagingSenderId: "185728376090",
  appId: "1:185728376090:web:e3a2d232e7fe09435c60a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const moviesRef=collection(db,'movies')
export const reviewsRef=collection(db,'reviews')
export const userRef=collection(db,'user')
export default app