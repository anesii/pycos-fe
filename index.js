import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { initializeApp } from 'firebase/app';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuQ7hm6wirhb_3kKAP8czRgnJ1mZrK0M0",
  authDomain: "pycoshield.firebaseapp.com",
  projectId: "pycoshield",
  storageBucket: "pycoshield.firebasestorage.app",
  messagingSenderId: "617234133995",
  appId: "1:617234133995:web:3e40a905691d77ec48dfae",
  measurementId: "G-KCW63LRLYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

export default App;