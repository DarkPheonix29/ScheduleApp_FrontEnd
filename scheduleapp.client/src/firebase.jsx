// firebase.jsx

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBl-7HDR-gQnsbHeAZPYu2129Wzx3M3ouY",
    authDomain: "scheduleapp-819ca.firebaseapp.com",
    projectId: "scheduleapp-819ca",
    storageBucket: "scheduleapp-819ca.firebasestorage.app",
    messagingSenderId: "595095054006",
    appId: "1:595095054006:web:91de1e958ffc181e236817",
    measurementId: "G-SV5D5K3SEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export auth as well, so you can use it in other parts of your app
export { app, auth, db };  // <-- Make sure to export auth as well
export default app;
