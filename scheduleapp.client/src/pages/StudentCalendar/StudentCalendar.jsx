import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';
import styles from './StudentCalendar.module.css';

const localizer = momentLocalizer(moment);

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

const StudentCalendar = () => {
    const [userEmail, setUserEmail] = useState('');
    const [availability, setAvailability] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            setUserEmail(user.email);
            fetchAllAvailability();
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
        <main className={styles.mainContainer}>
            <Header userEmail={userEmail} onLogout={handleLogout} />
            <section>
                <h2>Book a Lesson</h2>
                <Calendar
                    localizer={localizer}
                    events={availability}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    selectable
                    onSelectEvent={handleSelectEvent}
                    style={{ height: 500 }}
                />
            </section>
        </main>
    );
};

export default StudentCalendar;
