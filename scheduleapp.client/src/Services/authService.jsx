// authService.jsx

import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase"; // Ensure db is imported from firebase
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore functions

const AuthContext = createContext(null);

// Function to sign up a user
export const signUp = async (email, password, role) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save role in Firestore
        await setDoc(doc(db, "users", user.uid), { role });

        return user;
    } catch (error) {
        console.error("Firebase Sign-Up Error:", error.message);
        throw error;
    }
};

// Function to log in a user
export const logIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const role = userDoc.exists() ? userDoc.data().role : null;

        return { user, role };
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error;
    }
};

// Function to log out a user
export const logOut = async () => {
    try {
        await signOut(auth);
        console.log("Logged out successfully");
    } catch (error) {
        console.error("Error logging out:", error.message);
    }
};

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);

                // Fetch role from Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));
                setRole(userDoc.exists() ? userDoc.data().role : null);
            } else {
                setCurrentUser(null);
                setRole(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, role }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use AuthContext
export function useAuth() {
    return useContext(AuthContext);
}
