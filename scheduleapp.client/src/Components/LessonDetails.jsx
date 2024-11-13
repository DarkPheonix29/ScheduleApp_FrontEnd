// src/pages/LessonDetails/LessonDetails.jsx

import React from 'react';
import { useParams } from 'react-router-dom';

const LessonDetails = () => {
    const { lessonId } = useParams(); // Get the lesson ID from the URL params

    // Fetch or get lesson details using the lessonId (For now, we simulate the lesson)
    const lessonDetails = {
        id: lessonId,
        student: "John Doe",
        date: "2024-10-14",
        time: "9:00 AM",
        topic: "Driving Lesson",
        notes: "Focus on parallel parking.",
    };

    return (
        <div>
            <h2>Lesson Details</h2>
            <p>Student: {lessonDetails.student}</p>
            <p>Date: {lessonDetails.date}</p>
            <p>Time: {lessonDetails.time}</p>
            <p>Topic: {lessonDetails.topic}</p>
            <p>Notes: {lessonDetails.notes}</p>
        </div>
    );
};

export default LessonDetails;
