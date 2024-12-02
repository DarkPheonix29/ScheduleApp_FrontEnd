import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./SignUp.module.css";

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registrationKey, setRegistrationKey] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Invalid email format.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        try {
            const response = await axios.post("/api/account/signup", {
                email,
                password,
                registrationKey,
                name: email.split("@")[0],
            });

            if (response.data.message === "User registered successfully") {
                navigate("/login");
            } else {
                setError("Signup failed. Please try again.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred during signup.");
        }
    };

    return (
        <main className={styles.signUpContainer}>
            <header className={styles.header}>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9e9e5de92c55fb604aec2676d045431b667b6fc690c90eccbe454d2f5e88fde?placeholderIfAbsent=true&apiKey=7a6d6551ec8b4e26865b758612878fc8"
                    alt="Company Logo"
                    className={styles.logo}
                />
            </header>

            <form onSubmit={handleSignUp} className={styles.signUpForm}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
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
                        className={styles.input}
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
                        className={styles.input}
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.signUpButton}>Sign Up</button>

                <p className={styles.loginLink}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </main>
    );
}

export default SignUpPage;
