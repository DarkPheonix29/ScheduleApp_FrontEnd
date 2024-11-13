// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css';

// Import your pages
import Login from './pages/Login/Login';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import StudentCalendar from './pages/StudentCalendar/StudentCalendar';
import InstructorDashboard from './pages/InstructorDashboard/InstructorDashboard';
import InstructorCalendar from './pages/InstructorCalendar/InstructorCalendar';
import LessonDetails from './components/LessonDetails'; // Add Lesson Details Page

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/student-dashboard" element={<StudentDashboard />} />
                    <Route path="/student-calendar" element={<StudentCalendar />} />
                    <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
                    <Route path="/instructor-calendar" element={<InstructorCalendar />} />
                    <Route path="/lesson-details/:lessonId" element={<LessonDetails />} /> {/* Add this route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
