// src/pages/InstructorCalendar/InstructorCalendar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './InstructorCalendar.module.css';

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

// InstructorCalendar Component
const InstructorCalendar = () => {
    return (
        <main className={styles.mainContent}>
            <Header />
            <div className={styles.calendarContainer}>
                <Calendar
                    localizer={localizer}
                    events={[]} // Add your events here
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="month"
                    views={['month', 'week', 'day']}
                    defaultDate={new Date()}
                    style={{ height: '100%' }} // Ensure calendar takes full container height
                />
            </div>
        </main>
    );
};

export default InstructorCalendar;
