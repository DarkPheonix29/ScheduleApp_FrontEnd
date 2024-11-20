import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/authService"; // Import useAuth

function ProtectedRoute({ children, requiredRole }) {
    const { currentUser, role } = useAuth() || {}; // Add a fallback value

    if (!currentUser) {
        // Redirect or show a loading screen if not authenticated
        return <Navigate to="/login" />;
    }

    if (requiredRole && role !== requiredRole) {
        // Redirect or show an error if the role doesn't match
        return <Navigate to="/unauthorized" />;
    }

    return children;
}

export default ProtectedRoute;

