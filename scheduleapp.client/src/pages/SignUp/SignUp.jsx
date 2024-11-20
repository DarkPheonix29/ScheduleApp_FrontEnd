import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { signUp } from "../../services/authService"; // Import the signUp function for Firebase authentication
import styles from './SignUp.module.css';

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
            // Firebase signup
            const user = await signUp(email, password);

            if (user) {
                // Redirect to the dashboard or a welcome page after a successful signup
                navigate("/login"); // Adjust this route to your actual student dashboard
            } else {
                // If the signup failed, show an error message
                setError("Unable to sign up. Please try again.");
            }
        } catch (error) {
            console.error("Signup Error: ", error);
            setError("An error occurred while signing up. Please try again.");
        }
    };

    return (
        <main className={styles.loginContainer}>
            {/* Header with logo */}
            <header className={styles.header}>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9e9e5de92c55fb604aec2676d045431b667b6fc690c90eccbe454d2f5e88fde?placeholderIfAbsent=true&apiKey=7a6d6551ec8b4e26865b758612878fc8"
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

                {error && <p className={styles.error}>{error}</p>} {/* Display error message if exists */}

                <button type="submit" className={styles.loginOption}>
                    Sign Up
                </button>
            </form>

            {/* Link to login page */}
            <p className={styles.registerLink}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </main>
    );
}

export default SignUpPage;
