import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css';


// Import your pages (simplified for now)
import Login from './pages/Login/Login';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import StudentCalendar from './pages/StudentCalendar/StudentCalendar';
import InstructorDashboard from './pages/InstructorDashboard/InstructorDashboard';
import InstructorCalendar from './pages/InstructorCalendar/InstructorCalendar';
import InstructorStudentView from './pages/InstructorStudentView/InstructorStudentView';

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
