// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDURUZ3xyKjlM2AKci8RlPqCF5lq6ceTbM",
  authDomain: "test-a3e75.firebaseapp.com",
  projectId: "test-a3e75",
  storageBucket: "test-a3e75.appspot.com",
  messagingSenderId: "843097416416",
  appId: "1:843097416416:web:a8a233552465d860fba685",
  measurementId: "G-STPZ9M2QXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);