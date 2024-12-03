import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getAuth, signOut } from 'firebase/auth';
import styles from './StudentCalendar.module.css';

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

const StudentCalendar = () => {
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            setUserEmail(user.email);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };

    const events = [
        {
            title: 'Lesson with Instructor',
            start: new Date(),
            end: new Date(),
        },
    ];

    return (
        <main className={styles.mainContent}>
            <Header userEmail={userEmail} onLogout={handleLogout} />
            <div className={styles.calendarContainer}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="month"
                    views={['month', 'week', 'day']}
                    defaultDate={new Date()}
                    style={{ height: '100%' }}
                />
            </div>
        </main>
    );
};

export default StudentCalendar;
