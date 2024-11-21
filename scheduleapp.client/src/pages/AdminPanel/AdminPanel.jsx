import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './AdminPanel.module.css';

function AdminPanel() {
    const [keys, setKeys] = useState([]); // State to store generated keys
    const [newKey, setNewKey] = useState(""); // State for the new key to display

    // Fetch the list of keys from Firestore
    const fetchKeys = async () => {
        try {
            const response = await axios.get("/api/admin/keys"); // Endpoint to fetch keys from the backend
            setKeys(response.data.keys);
        } catch (error) {
            console.error("Error fetching keys:", error);
        }
    };

    // Handle the generation of a new registration key
    const handleGenerateKey = async () => {
        try {
            const response = await axios.post("/api/admin/generate-key"); // Call backend to generate key
            setNewKey(response.data.key); // Update new key state
            fetchKeys(); // Refresh the keys list
        } catch (error) {
            console.error("Error generating key:", error);
        }
    };

    // Handle marking a key as used (Optional, if you want to deactivate it)
    const handleMarkUsed = async (key) => {
        try {
            await axios.post("/api/admin/mark-key-used", { key }); // Call backend to mark key as used
            fetchKeys(); // Refresh the keys list
        } catch (error) {
            console.error("Error marking key as used:", error);
        }
    };

    // Fetch keys when component mounts
    useEffect(() => {
        fetchKeys();
    }, []);

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
                    {/* Add user management functionality here */}
                </section>

                <section className={styles.section}>
                    <h2>Lesson Management</h2>
                    <p>Monitor and schedule lessons across the platform.</p>
                    {/* Add lesson management functionality here */}
                </section>

                <section className={styles.section}>
                    <h2>Registration Key Management</h2>
                    <p>Manage one-time use registration keys.</p>

                    <button onClick={handleGenerateKey} className={styles.button}>
                        Generate New Key
                    </button>

                    {newKey && <p>New Key: {newKey}</p>}

                    <h3>Existing Keys</h3>
                    <ul>
                        {keys.map((key, index) => (
                            <li key={index}>
                                <span>{key.key}</span> -{" "}
                                {key.used ? "Used" : "Active"}
                                {!key.used && (
                                    <button onClick={() => handleMarkUsed(key.key)}>
                                        Mark as Used
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default AdminPanel;
