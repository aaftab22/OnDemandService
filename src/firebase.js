// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; 
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA3hcijEktFgxM5dKL-DsKZC-IgCahzy4",
  authDomain: "ondemandservice-c8882.firebaseapp.com",
  projectId: "ondemandservice-c8882",
  storageBucket: "ondemandservice-c8882.appspot.com",
  messagingSenderId: "406479767807",
  appId: "1:406479767807:web:fef471e3cd6aa75e5da4ca",
  measurementId: "G-SNT5J8V7J8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app)

export const auth = getAuth(app);

export const database = getDatabase(app);

// export {ref , set , push };

export default app;