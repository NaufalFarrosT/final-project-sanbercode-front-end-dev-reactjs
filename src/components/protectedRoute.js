import { AuthContext } from "../hooks/useAuth";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

    if (!token) {
      // user is not authenticated
      return <Navigate to="/login" />;
    }
    return children;
  };