import React from "react";
import { Link } from "react-router-dom"; // To handle navigation
import styles from './Login.module.css';

function LoginPage() {
    const loginOptions = [
        { type: 'Student', marginTop: '322px', path: '/student-dashboard' },
        { type: 'Instructor', marginTop: '138px', path: '/instructor-dashboard' }
    ];

    return (
        <main className={styles.loginContainer}>
            <header className={styles.header}>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9e9e5de92c55fb604aec2676d045431b667b6fc690c90eccbe454d2f5e88fde?placeholderIfAbsent=true&apiKey=7a6d6551ec8b4e26865b758612878fc8"
                    alt="Company Logo"
                    className={styles.logo}
                />
            </header>
            {loginOptions.map((option, index) => (
                <Link key={index} to={option.path}>
                    <button
                        className={styles.loginOption}
                        style={{ marginTop: option.marginTop }}
                    >
                        {option.type}
                    </button>
                </Link>
            ))}
        </main>
    );
}

export default LoginPage;
