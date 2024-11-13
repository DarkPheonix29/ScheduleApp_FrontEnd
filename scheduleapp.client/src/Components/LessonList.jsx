// src/components/LessonList.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const LessonList = () => {
    const lessons = [
        { id: 1, student: 'John Doe', date: '2024-11-15', time: '10:00 AM' },
        { id: 2, student: 'Jane Smith', date: '2024-11-16', time: '1:00 PM' },
        { id: 3, student: 'Michael Johnson', date: '2024-11-17', time: '9:00 AM' },
    ];

    return (
        <div className="lessonList">
            <h2>Upcoming Lessons</h2>
            {lessons.map(lesson => (
                <div key={lesson.id} className="lessonItem">
                    <h3>{lesson.student}</h3>
                    <p>{lesson.date} at {lesson.time}</p>
                    <Link to={`/lesson/${lesson.id}`} className="lessonDetailsLink">
                        View Details
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default LessonList;
