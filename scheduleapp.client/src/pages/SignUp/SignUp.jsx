import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./SignUp.module.css";

function SignUpPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        registrationKey: "",
        name: "",
        phoneNumber: "",
        address: "",
        pickupAddress: "",
        dateOfBirth: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");

        const { email, password, confirmPassword, registrationKey, name, phoneNumber, address, pickupAddress, dateOfBirth } = formData;

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
            // Send the full data to the backend (including name, phone, address, etc.)
            const response = await axios.post("/api/account/signup", {
                email,
                password,
                registrationKey,
                name,
                phoneNumber,
                address,
                pickupAddress,
                dateOfBirth,
            });


            if (response.status === 200) {
                if (response.data.message === "User registered successfully") {
                    navigate("/login");
                } else if (response.data.message === "Invalid registration key") {
                    setError("Invalid registration key.");
                } else if (response.data.hasOwnProperty('errors')) {
                    // Handle potential error objects returned by the API
                    setError(response.data.errors.join(', '));
                } else {
                    setError("An unexpected error occurred during signup.");
                }
            } else {
                setError(`Signup failed with status code: ${response.status}`);
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred during signup.");
        }
    }


    return (
        <main className={styles.signUpContainer}>
            <header className={styles.header}>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9e9e5de92c55fb604aec2676d045431b667b6fc690c90eccbe454d2f5e88fde?placeholderIfAbsent=true&apiKey=7a6d6551ec8b4e26865b758612878fc8"
                    alt="Company Logo"
                    className={styles.logo}
                />
            </header>

            <div className={styles.formWrapper}>
                <form onSubmit={handleSignUp} className={styles.signUpForm}>
                    <div className={styles.leftColumn}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="registrationKey">Registration Key:</label>
                            <input
                                type="text"
                                id="registrationKey"
                                name="registrationKey"
                                value={formData.registrationKey}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="pickupAddress">Pickup Address:</label>
                            <input
                                type="text"
                                id="pickupAddress"
                                name="pickupAddress"
                                value={formData.pickupAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="dateOfBirth">Date of Birth:</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.signUpButton}>Sign Up</button>

                    <p className={styles.loginLink}>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </main>
    );
}

export default SignUpPage;
