// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxRsgENsxlUVYCRauvBZ4MRqbb4mcyh3Y",
  authDomain: "estudo-8a639.firebaseapp.com",
  projectId: "estudo-8a639",
  storageBucket: "estudo-8a639.appspot.com",
  messagingSenderId: "906863907471",
  appId: "1:906863907471:web:2ea49d412005a1104396fa",
  measurementId: "G-N08ZP8LMQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;