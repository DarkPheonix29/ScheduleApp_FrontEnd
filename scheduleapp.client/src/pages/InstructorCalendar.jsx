import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'react-big-calendar';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../App.css';

const localizer = momentLocalizer(moment);

const InstructorCalendar = () => {
    return (
        <div>
            <h2>Instructor Full Calendar</h2>
            <Calendar
                localizer={localizer}
                events={[]}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
            <Link to="/instructor-dashboard">Back to Dashboard</Link>
        </div>
    );
};

export default InstructorCalendar;
