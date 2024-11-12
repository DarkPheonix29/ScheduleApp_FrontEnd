import './Calendar.css'; // Ensure this path is correct
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
    // State for holding events
    const [myEvents, setMyEvents] = useState([
        {
            title: 'Meeting',
            start: new Date(2024, 10, 15, 10, 0),
            end: new Date(2024, 10, 15, 12, 0),
            id: 0,
        },
        {
            title: 'Lunch',
            start: new Date(2024, 10, 16, 12, 0),
            end: new Date(2024, 10, 16, 13, 0),
            id: 1,
        },
    ]);

    // Function to update the event position when dropped
    const moveEvent = (event, start, end) => {
        const updatedEvents = myEvents.map((existingEvent) => {
            if (existingEvent.id === event.id) {
                return { ...existingEvent, start, end };
            }
            return existingEvent;
        });
        setMyEvents(updatedEvents); // Update state with new event data
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={myEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }} // Adjust height as needed
                    onEventDrop={({ event, start, end }) => moveEvent(event, start, end)} // Handle event drop
                    onSelectEvent={(event) => alert(event.title)} // Optional: Event selection
                    resizable // Enable event resizing
                    draggable // Enable dragging
                />
            </div>
        </DndProvider>
    );
};

export default CalendarComponent;
