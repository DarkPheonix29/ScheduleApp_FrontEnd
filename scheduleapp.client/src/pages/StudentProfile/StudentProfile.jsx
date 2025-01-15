import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './StudentProfile.module.css'; // Ensure the CSS path is correct

const Header = ({ userEmail, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <header className={styles.header}>
            <span className={styles.userEmail} onClick={toggleDropdown}>
                {userEmail}
            </span>
            {isDropdownOpen && (
                <div className={styles.dropdown}>
                    <button onClick={onLogout} className={styles.logoutButton}>
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
};

const StudentProfile = () => {
    const { email } = useParams(); // Retrieve email from URL parameter
    const [studentData, setStudentData] = useState(null);
    const [profileId, setProfileId] = useState(null); // State to hold the profileId
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentProfile = async (email) => {
            try {
                const response = await axios.get(`/api/account/studentprofile/${email}`);
                const { data } = response;
                setStudentData(data); // Set the student data
                setProfileId(data.profileId); // Extract and set the profileId
            } catch (error) {
                console.error('Error fetching student profile:', error);
                navigate('/404'); // Redirect to a 404 page if profile is not found
            }
        };

        fetchStudentProfile(email);
    }, [email, navigate]);

    if (!studentData) {
        return <div>Loading...</div>; // Loading state until data is fetched
    }

    return (
        <main className={styles.welcomeContainer}>
            <Header userEmail="Instructor" onLogout={() => navigate('/logout')} />
            <section className={styles.welcomeMessage}>
                <h1>Student Profile: {studentData.displayName}</h1>
            </section>
            <section className={styles.profileDetails}>
                <div className={styles.profileItem}>
                    <strong>Email:</strong> {studentData.email}
                </div>
                <div className={styles.profileItem}>
                    <strong>Phone:</strong> {studentData.phoneNumber}
                </div>
                <div className={styles.profileItem}>
                    <strong>Address:</strong> {studentData.address}
                </div>
                <div className={styles.profileItem}>
                    <strong>Pickup Address:</strong> {studentData.pickupAddress}
                </div>
                <div className={styles.profileItem}>
                    <strong>Date of Birth:</strong> {new Date(studentData.dateOfBirth).toLocaleDateString()}
                </div>
                <h2>{studentData.name}</h2>
                <button onClick={() => navigate(`/excelviewer/${profileId}`)}>
                    Edit Instructor Card
                </button>
            </section>
            <section className={styles.scheduleContainer}>
                <Link to="/instructor-dashboard">Back to Dashboard</Link>
            </section>
        </main>
    );
};

export default StudentProfile;
