import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './app.css';
import { AuthProvider } from "./services/authService";

// Import your pages
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import StudentCalendar from './pages/StudentCalendar/StudentCalendar';
import InstructorDashboard from './pages/InstructorDashboard/InstructorDashboard';
import InstructorCalendar from './pages/InstructorCalendar/InstructorCalendar';
import AdminPanel from './pages/AdminPanel/AdminPanel'; // Import Admin Panel
import StudentProfile from './pages/StudentProfile/StudentProfile'; // Import Student Profile
import ProtectedRoute from './Services/ProtectedRoute'; // New protected route component

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {/* Redirect the root path to /login */}
                        <Route path="/" element={<Navigate to="/login" />} />

                        {/* Public Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />

                        {/* Protected Routes */}
                        <Route
                            path="/student-dashboard"
                            element={<ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>}
                        />
                        <Route
                            path="/student-calendar"
                            element={<ProtectedRoute requiredRole="student"><StudentCalendar /></ProtectedRoute>}
                        />
                        <Route
                            path="/instructor-dashboard"
                            element={<ProtectedRoute requiredRole="instructor"><InstructorDashboard /></ProtectedRoute>}
                        />
                        <Route
                            path="/instructor-calendar"
                            element={<ProtectedRoute requiredRole="instructor"><InstructorCalendar /></ProtectedRoute>}
                        />
                        <Route
                            path="/admin-panel"
                            element={<ProtectedRoute requiredRole="admin"><AdminPanel /></ProtectedRoute>}
                        />
                        <Route
                            path="/student/:email"
                            element={<ProtectedRoute requiredRole="instructor"><StudentProfile /></ProtectedRoute>}
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
