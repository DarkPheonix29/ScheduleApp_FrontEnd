import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios"; // Axios for API calls
import styles from './SignUp.module.css';

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registrationKey, setRegistrationKey] = useState(""); // New state for registration key
    const [error, setError] = useState(""); // To show any signup error message
    const navigate = useNavigate(); // To redirect the user after signup

    // Handle signup form submission
    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        try {
            const response = await axios.post("/api/account/signup", {
                email,
                password,
                registrationKey,
                name: email.split('@')[0], // Just using email before '@' as the name for simplicity
            });

            if (response.data.message === "User registered successfully") {
                // Redirect to the login page after a successful signup
                navigate("/login");
            } else {
                // If the signup failed, show an error message
                setError("Unable to sign up. Please try again.");
            }
        } catch (error) {
            console.error("Signup Error: ", error);
            setError(error.response?.data?.message || "An error occurred while signing up. Please try again.");
        }
    };

    return (
        <main className={styles.loginContainer}>
            {/* Header with logo */}
            <header className={styles.header}>
                <img
                    src="https://your-logo-url-here.com"
                    alt="Company Logo"
                    className={styles.logo}
                />
            </header>

            {/* Signup Form */}
            <form onSubmit={handleSignUp} className={styles.loginForm}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="registrationKey">Registration Key:</label>
                    <input
                        type="text"
                        id="registrationKey"
                        value={registrationKey}
                        onChange={(e) => setRegistrationKey(e.target.value)}
                        required
                    />
                </div>

                {/* Show error message */}
                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.button}>
                    Sign Up
                </button>

                {/* Link to Login page */}
                <div className={styles.switchForm}>
                    <p>Already have an account?</p>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </main>
    );
}

export default SignUpPage;
