import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';
import styles from './InstructorDashboard.module.css';
import { Link, useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const Header = ({ userEmail, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <header className={styles.header}>
            <Link to="/">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9e9e5de92c55fb604aec2676d045431b667b6fc690c90eccbe454d2f5e88fde"
                    alt="Logo"
                    className={styles.logo}
                />
            </Link>
            <div className={styles.userMenu}>
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
            </div>
        </header>
    );
};

const InstructorDashboard = () => {
    const [userEmail, setUserEmail] = useState('');
    const [availability, setAvailability] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            setUserEmail(user.email);
            fetchAvailability(user.email);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => navigate('/login'))
            .catch((error) => console.error('Error logging out:', error));
    };

    const fetchAvailability = async (email) => {
        try {
            const response = await axios.get(`/api/instructoravailability/all-availability`);
            const formattedAvailability = response.data.map((a) => {
                // Convert start and end times to the user's local time zone
                const startDate = moment.tz(a.start, 'UTC').format(); // Assuming UTC storage
                const endDate = moment.tz(a.end, 'UTC').format();
                return {
                    title: 'Available',
                    start: new Date(startDate),
                    end: new Date(endDate),
                };
            });
            setAvailability(formattedAvailability);
        } catch (error) {
            console.error('Error fetching availability:', error);
        }
    };

    const handleSelectSlot = async (slotInfo) => {
        const { start, end } = slotInfo;

        if ((end - start) / (1000 * 60 * 60) >= 1) {
            try {
                const response = await axios.post('/api/instructoravailability/add-availability', {
                    instructorEmail: userEmail,
                    start,
                    end,
                    status: 'Available',
                });
                setAvailability((prev) => [...prev, { title: 'Available', start, end }]);
                alert('Availability added successfully!');
            } catch (error) {
                console.error('Error adding availability:', error);
                alert('Failed to add availability.');
            }
        } else {
            alert('Please select a time slot of at least 1 hour.');
        }
    };

    return (
        <main className={styles.mainContainer}>
            <Header userEmail={userEmail} onLogout={handleLogout} />
            <section className={styles.welcomeMessage}>
                <h1>Welcome back, {userEmail}!</h1>
                <p className={styles.lessonDate}>Set your availability for lessons below:</p>
            </section>
            <div className={styles.calendarContainer}>
                <Calendar
                    localizer={localizer}
                    events={availability}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    views={['week', 'day']}
                    step={60}
                    showMultiDayTimes
                    defaultDate={new Date()}
                    onSelectSlot={handleSelectSlot}
                    selectable
                    style={{ height: '100%' }}
                />
            </div>
        </main>
    );
};

export default InstructorDashboard;