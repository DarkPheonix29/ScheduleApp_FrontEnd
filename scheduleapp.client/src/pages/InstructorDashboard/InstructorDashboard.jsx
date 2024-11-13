// src/pages/InstructorDashboard/InstructorDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { startOfWeek, addDays } from 'date-fns';
import styles from './InstructorDashboard.module.css';

const localizer = momentLocalizer(moment);

// Header Component
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

// WelcomeMessage Component
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

// Schedule Section with link to full calendar
const ScheduleSection = () => (
    <section className={styles.scheduleContainer}>
        <h2 className={styles.scheduleTitle}>View your upcoming lessons!</h2>
        <Link to="/instructor-calendar" className={styles.viewCalendar}>View full calendar</Link>
    </section>
);

const InstructorDashboard = ({ username }) => {
    const currentWeek = [...Array(7)].map((_, i) => addDays(startOfWeek(new Date()), i));
    const events = [
        { title: 'Lesson with Student', start: new Date(currentWeek[1].setHours(10, 0)), end: new Date(currentWeek[1].setHours(11, 0)) }
    ];

    return (
        <main className={styles.mainContainer}>
            <Header />
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

export default InstructorDashboard;
