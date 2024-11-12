import React, { useState } from 'react';
import moment from 'moment'; // Import moment.js
import Calendar from './Calendar'; // Import CalendarComponent
import './App.css';

function App() {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [events, setEvents] = useState([
        {
            title: 'Sample Event',
            start: new Date(),
            end: new Date(moment().add(1, 'hour')), // Add 1 hour to current date
        },
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const student = { name };

        try {
            const response = await fetch('/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });

            if (!response.ok) {
                throw new Error('Failed to create student');
            }

            alert('Student created successfully!');
            setName('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSelectSlot = ({ start, end }) => {
        const title = window.prompt('New event name');
        if (title) {
            setEvents([
                ...events,
                {
                    title,
                    start,
                    end,
                },
            ]);
        }
    };

    const handleSelectEvent = (event) => {
        alert(`Event: ${event.title}`);
    };

    return (
        <div className="App">
            <h1>Student Management</h1>
            <form onSubmit={handleSubmit}>
                <h2>Create Student</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input
                    type="text"
                    placeholder="Student Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Add Student</button>
            </form>

            <h3>My Calendar</h3>
            <CalendarComponent
                events={events}
                handleSelectSlot={handleSelectSlot}
                handleSelectEvent={handleSelectEvent}
            />
        </div>
    );
}

export default App;
