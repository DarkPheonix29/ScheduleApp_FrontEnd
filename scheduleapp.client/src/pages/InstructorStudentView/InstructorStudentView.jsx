import React from 'react';
import { Link } from 'react-router-dom';


const InstructorStudentView = () => {
    return (
        <div>
            <h2>Student Information</h2>
            <p>Student's name, lesson history, and progress tracking</p>
            <Link to="/instructor-dashboard">Back to Dashboard</Link>
        </div>
    );
};

export default InstructorStudentView;
