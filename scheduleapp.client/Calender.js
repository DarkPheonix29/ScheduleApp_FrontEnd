import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Ensure calendar styles are imported

const Calendar = () => {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setDate(newDate);
        console.log(newDate); // You can handle the selected date here
    };

    return (
        <div style={{ padding: '20px', backgroundColor: 'lightgray', height: '700px', width: '100%' }}>
            <h3>Calendar</h3>
            <ReactCalendar onChange={handleDateChange} value={date} />
        </div>
    );
};

export default Calendar;
