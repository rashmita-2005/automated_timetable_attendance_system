import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import './App.css'
import RegisterPage2 from "./pages/registerPage2";
import LoginPage2 from "./pages/loginPage2";
import { AuthProvider } from "./context/authContext";
import AdminDashboard from "./pages/adminDashboard";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage2 />} />
          <Route path="/login" element={<LoginPage2 />} />
          {/*<Route
            path="/student-dashboard"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty-dashboard"
            element={
              <ProtectedRoute role="faculty">
                <FacultyDashboard />
              </ProtectedRoute>
            }
          />*/}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
