import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../services/authService"; // Firebase login function
import styles from "./Login.module.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // To display login error messages
    const navigate = useNavigate(); // For navigation after login

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const { user, role } = await logIn(email, password);

            if (user) {
                // Redirect based on role
                switch (role) {
                    case "admin":
                        navigate("/admin-panel");
                        break;
                    case "student":
                        navigate("/student-dashboard");
                        break;
                    case "instructor":
                        navigate("/instructor-dashboard");
                        break;
                    default:
                        setError("Role not assigned. Please contact support.");
                        break;
                }
            } else {
                setError("Invalid email or password.");
            }
        } catch (error) {
            console.error("Login Error:", error.message);
            setError(
                error.code === "auth/user-not-found"
                    ? "No account found with this email."
                    : error.code === "auth/wrong-password"
                        ? "Incorrect password. Please try again."
                        : "Login failed. Please try again later."
            );
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

            {/* Login Form */}
            <form onSubmit={handleLogin} className={styles.loginForm}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-required="true"
                        aria-describedby="emailHelp"
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
                        aria-required="true"
                        aria-describedby="passwordHelp"
                        className={styles.input}
                    />
                </div>

                {error && (
                    <p id="errorMessage" className={styles.error} role="alert">
                        {error}
                    </p>
                )}

                <button type="submit" className={styles.loginButton}>
                    Login
                </button>
            </form>

            {/* Link to sign-up page */}
            <p className={styles.registerLink}>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </main>
    );
}

export default LoginPage;
