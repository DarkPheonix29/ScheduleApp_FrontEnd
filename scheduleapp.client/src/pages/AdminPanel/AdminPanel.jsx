import React from "react";
import styles from './AdminPanel.module.css';

function AdminPanel() {
    return (
        <div className={styles.adminPanel}>
            <header className={styles.header}>
                <h1>Admin Panel</h1>
                <p>Manage your application here</p>
            </header>
            <main className={styles.mainContent}>
                <section className={styles.section}>
                    <h2>User Management</h2>
                    <p>View, add, and manage users in the system.</p>
                    {/* Add functionalities here */}
                </section>
                <section className={styles.section}>
                    <h2>Lesson Management</h2>
                    <p>Monitor and schedule lessons across the platform.</p>
                    {/* Add functionalities here */}
                </section>
            </main>
        </div>
    );
}

export default AdminPanel;
