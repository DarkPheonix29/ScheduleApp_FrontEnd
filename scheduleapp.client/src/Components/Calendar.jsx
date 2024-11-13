// src/components/Calendar.jsx
import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './Calendar.module.css';

const localizer = momentLocalizer(moment);

const Calendar = ({ events, onEventSelect, userType }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newEvent, setNewEvent] = useState(null);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        onEventSelect(event);
    };

    const handleSelectSlot = ({ start, end }) => {
        if (userType === 'instructor') {
            // Only instructors can create new events (lessons)
            const title = prompt('Enter lesson title:');
            if (title) {
                setNewEvent({
                    title,
                    start,
                    end,
                });
                events.push({ title, start, end });
            }
        }
    };

    return (
        <div className={styles.calendarContainer}>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView={userType === 'instructor' ? 'week' : 'month'}
                views={['month', 'week', 'day']}
                defaultDate={new Date()}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                style={{ height: '100%' }}
            />
            {selectedEvent && (
                <div className={styles.eventDetails}>
                    <h3>{selectedEvent.title}</h3>
                    <p>
                        {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm a')} to {moment(selectedEvent.end).format('h:mm a')}
                    </p>
                </div>
            )}
            {newEvent && (
                <div className={styles.newEvent}>
                    <h3>New Event: {newEvent.title}</h3>
                    <p>
                        {moment(newEvent.start).format('MMMM Do YYYY, h:mm a')} to {moment(newEvent.end).format('h:mm a')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Calendar;
