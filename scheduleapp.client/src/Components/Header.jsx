// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Ensure correct path

const Header = () => (
    <header className={styles.header}>
        <Link to="/">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9e9e5de92c55fb604aec2676d045431b667b6fc690c90eccbe454d2f5e88fde?placeholderIfAbsent=true&apiKey=7a6d6551ec8b4e26865b758612878fc8"
                alt="Company Logo"
                className={styles.logo}
            />
        </Link>
        <nav className={styles.menuContainer}>
            <div className={styles.menuLine} />
            <div className={styles.menuLine} />
            <div className={styles.menuLine} />
        </nav>
    </header>
);

export default Header;
