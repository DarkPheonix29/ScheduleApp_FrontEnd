import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/authService";

function ProtectedRoute({ children, requiredRole }) {
    const { currentUser, role } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default ProtectedRoute;
