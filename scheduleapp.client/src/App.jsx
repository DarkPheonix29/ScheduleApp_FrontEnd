import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css';


// Import your pages (simplified for now)
import Login from './pages/LoginPage/Login';
import StudentDashboard from './pages/StudentDashboardPage/StudentDashboard';
import StudentCalendar from './pages/StudentCalendar';
import InstructorDashboard from './pages/InstructorDashboard';
import InstructorCalendar from './pages/InstructorCalendar';
import InstructorStudentView from './pages/InstructorStudentView';

function App() {
    console.log("App is rendering");

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/student-dashboard" element={<StudentDashboard />} />
                    <Route path="/student-calendar" element={<StudentCalendar />} />
                    <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
                    <Route path="/instructor-calendar" element={<InstructorCalendar />} />
                    <Route path="/instructor-student-view" element={<InstructorStudentView />} />
                </Routes>
            </div>
        </Router>
    );
}


export default App;
