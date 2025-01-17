import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import navigate for redirection
import { logOut } from "../../services/authService"; // Import logOut function
import styles from './AdminPanel.module.css';
import WebSocketService from "../../webSocketService";
import { ToastContainer, toast } from "react-toastify"; // Import toast components
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

function AdminPanel() {
    const [keys, setKeys] = useState([]); // State to store generated keys
    const [newKey, setNewKey] = useState(""); // State for the new key to display
    const navigate = useNavigate(); // For navigation after logout
    const [notificationMessage, setNotificationMessage] = useState(""); // Notification message input
    const [notifications, setNotifications] = useState([]); // Received notifications

    // Fetch the list of keys from Firestore
    const fetchKeys = async () => {
        try {
            const response = await axios.get("/api/admin/keys"); // Endpoint to fetch keys from the backend
            if (response.data && Array.isArray(response.data.keys)) {
                setKeys(response.data.keys); // Update keys with the array returned from backend
            } else {
                setKeys([]); // Default to empty array if no valid keys are returned
            }
        } catch (error) {
            console.error("Error fetching keys:", error);
            setKeys([]); // Set to empty array in case of error or invalid response
        }
    };


    const handleSendNotification = async () => {
        if (notificationMessage.trim() !== "") {
            try {
                // Send the notification message as plain text
                await axios.post("/api/admin/sendmessage", notificationMessage, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                setNotificationMessage(""); // Clear the input field
                console.log("Notification sent successfully!");
            } catch (error) {
                console.error("Error sending notification:", error);
            }
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

    // Handle logging out
    const handleLogout = async () => {
        try {
            await logOut(); // Log the user out
            navigate("/login"); // Redirect to login page after logout
        } catch (error) {
            console.error("Error logging out:", error);
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

                {/* Logout Button */}
                <button onClick={handleLogout} className={styles.logoutButton}>
                    Logout
                </button>
            </header>

            <main className={styles.mainContent}>
                <section className={styles.section}>
                    <h2>User Management</h2>
                    <p>View, add, and manage users in the system.</p>
                    {/* Add user management functionality here */}
                </section>

                <section className={styles.section}>
                    <h2>Send Notifications</h2>
                    <textarea
                        value={notificationMessage}
                        onChange={(e) => setNotificationMessage(e.target.value)}
                        placeholder="Enter notification message"
                    />
                    <button onClick={handleSendNotification} className={styles.button}>
                        Send Notification
                    </button>
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
