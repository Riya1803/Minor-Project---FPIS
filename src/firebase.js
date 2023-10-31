// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration, replace it with your project keys
const firebaseConfig = {
  apiKey: "AIzaSyDtKWhP8R4pdqvjahKowxpRr4tqG-ZN6lU",
  authDomain: "fake-product-identificat-d7337.firebaseapp.com",
  projectId: "fake-product-identificat-d7337",
  storageBucket: "fake-product-identificat-d7337.appspot.com",
  messagingSenderId: "597678755552",
  appId: "1:597678755552:web:e98838d607acd5c0730a85",
  measurementId: "G-3GSJ4G7RDM",
  databaseURL:"https://fake-product-identificat-d7337-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const database = getDatabase(app);