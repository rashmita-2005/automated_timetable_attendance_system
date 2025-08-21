
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function ProtectedRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Unauthorized → redirect based on their role
    if (user.role === "student") return <Navigate to="/student-dashboard" replace />;
    if (user.role === "faculty") return <Navigate to="/faculty-dashboard" replace />;
    if (user.role === "admin") return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
