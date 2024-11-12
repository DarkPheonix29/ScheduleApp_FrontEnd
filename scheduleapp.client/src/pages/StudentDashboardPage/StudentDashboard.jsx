import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { startOfWeek, addDays } from 'date-fns';
import styles from './StudentDashboard.module.css';

const localizer = momentLocalizer(moment);

const Header = () => (
    <header className={styles.header}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9e9e5de92c55fb604aec2676d045431b667b6fc690c90eccbe454d2f5e88fde?placeholderIfAbsent=true&apiKey=7a6d6551ec8b4e26865b758612878fc8" alt="Company Logo" className={styles.logo} />
        <nav className={styles.menuContainer}>
            <div className={styles.menuLine} />
            <div className={styles.menuLine} />
            <div className={styles.menuLine} />
        </nav>
    </header>
);

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
        <h2 className={styles.scheduleTitle}>
            Schedule your next lesson!
        </h2>
        <a href="#" className={styles.viewCalendar}>View full calendar</a>
    </section>
);

const StudentDashboard = () => {
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
            <Header />
            <WelcomeMessage username="[user]" nextLessonDate="10 AM, October 2nd" />
            <ScheduleSection />

            <div className={styles.calendarContainer}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    views={['week']}
                    step={30} // 30-minute intervals
                    min={new Date(2023, 10, 0, 0, 0)} // Start time 12 AM
                    max={new Date(2023, 10, 0, 23, 59)} // End time 11:59 PM
                    defaultDate={new Date()}
                />
            </div>
        </main>
    );
};

export default StudentDashboard;
