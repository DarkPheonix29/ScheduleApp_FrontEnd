import React from 'react';
import { Link } from 'react-router-dom';


const InstructorDashboard = () => {
    return (
        <div>
            <h2>Welcome back, Instructor!</h2>
            <p>Your upcoming lessons: [List of upcoming lessons]</p>
            <Link to="/instructor-calendar">View Full Calendar</Link>
        </div>
    );
};

export default InstructorDashboard;
