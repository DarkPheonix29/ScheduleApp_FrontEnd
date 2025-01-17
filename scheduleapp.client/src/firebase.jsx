import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyBl-7HDR-gQnsbHeAZPYu2129Wzx3M3ouY",
    authDomain: "scheduleapp-819ca.firebaseapp.com",
    projectId: "scheduleapp-819ca",
    storageBucket: "scheduleapp-819ca.appspot.com",
    messagingSenderId: "595095054006",
    appId: "1:595095054006:web:91de1e958ffc181e236817",
    measurementId: "G-SV5D5K3SEJ",
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, analytics }; // Ensure all services are exported
