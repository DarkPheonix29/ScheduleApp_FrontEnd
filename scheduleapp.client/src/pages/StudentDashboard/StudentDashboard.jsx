import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { startOfWeek, addDays } from 'date-fns';
import { getAuth, signOut } from 'firebase/auth';
import styles from './StudentDashboard.module.css';

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

const WelcomeMessage = ({ username, nextLessonDate }) => (
    <section className={styles.welcomeMessage}>
        <h1>
            <strong>Welcome back, {username}!</strong>
        </h1>
        <p className={styles.lessonDate}>
            Your next lesson is: {nextLessonDate}
        </p>
    </section>
);

const ScheduleSection = () => (
    <section className={styles.scheduleContainer}>
        <h2 className={styles.scheduleTitle}>Schedule your next lesson!</h2>
        <Link to="/student-calendar" className={styles.viewCalendar}>
            View full calendar
        </Link>
    </section>
);

const StudentDashboard = ({ username }) => {
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            setUserEmail(user.email);
        } else {
            navigate('/login'); // Redirect to login if no user is logged in
        }
    }, [navigate]);

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                navigate('/login'); // Redirect to login after logout
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };

    const currentWeek = [...Array(7)].map((_, i) => addDays(startOfWeek(new Date()), i));
    const events = [
        {
            title: 'Lesson with Instructor',
            start: new Date(currentWeek[1].setHours(10, 0)),
            end: new Date(currentWeek[1].setHours(11, 0)),
        },
    ];

    return (
        <main className={styles.welcomeContainer}>
            <Header userEmail={userEmail} onLogout={handleLogout} />
            <WelcomeMessage username={username} nextLessonDate="10 AM, October 2nd" />
            <ScheduleSection />
            <div className={styles.calendarContainer}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    views={['week']}
                    step={60}
                    showMultiDayTimes
                    defaultDate={new Date()}
                />
            </div>
        </main>
    );
};

export default StudentDashboard;
