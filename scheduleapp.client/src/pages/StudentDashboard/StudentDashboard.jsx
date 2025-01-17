import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getAuth, signOut } from 'firebase/auth';
import styles from './StudentDashboard.module.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const Header = ({ userEmail, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className={styles.header}>
            <Link to="/">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9e9e5de92c55fb604aec2676d045431b667b6fc690c90eccbe454d2f5e88fde?placeholderIfAbsent=true&apiKey=7a6d6551ec8b4e26865b758612878fc8"
                    alt="Company Logo"
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

const StudentDashboard = () => {
    const [userEmail, setUserEmail] = useState('');
    const [availability, setAvailability] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            setUserEmail(user.email);
            console.log('userEmail:', userEmail);
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
            const response = await axios.get(`/api/studentlesson/all-availability`);
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

    const handleSelectEvent = async (event) => {
        const duration = (new Date(event.end) - new Date(event.start)) / (1000 * 60 * 60);
        if (duration >= 1 && duration <= 2) {
            try {
                await axios.post('/api/studentlesson/book-lesson', {
                    studentEmail: userEmail,
                    instructorEmail: event.instructorEmail,
                    start: event.start,
                    end: event.end,
                });
                alert('Lesson booked successfully!');
            } catch (error) {
                console.error('Error booking lesson:', error);
                alert('Failed to book lesson.');
            }
        } else {
            alert('Please book lessons of 1 or 2 hours only.');
        }
    };

    return (
        <main className={styles.welcomeContainer}>
            <Header userEmail={userEmail} onLogout={handleLogout} />
            <section className={styles.welcomeMessage}>
                <h1>Welcome back, {userEmail}!</h1>
                <p>Your next lesson is: 10 AM, October 2nd</p>
            </section>
            <section className={styles.scheduleContainer}>
                <h2>Schedule your next lesson!</h2>
                <Link to="/student-calendar">View full calendar</Link>
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
                    onSelectSlot={handleSelectEvent}
                    selectable
                    style={{ height: '100%' }}
                />
            </div>
        </main>
    );
};

export default StudentDashboard;
