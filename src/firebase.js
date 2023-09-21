import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAisIh8L09fYUY2ZWdbicEGxXD3ihebbjk",
  authDomain: "drag-drop-d3e32.firebaseapp.com",
  projectId: "drag-drop-d3e32",
  storageBucket: "drag-drop-d3e32.appspot.com",
  messagingSenderId: "268313867882",
  appId: "1:268313867882:web:7cbaba1e36fabf978dbc13",
  measurementId: "G-GNBXQN4XGY",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
