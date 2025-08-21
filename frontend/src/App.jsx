import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import './App.css'
import RegisterPage2 from "./pages/registerPage2";
import LoginPage2 from "./pages/loginPage2";
import { AuthProvider } from "./context/authContext";
import AdminDashboard from "./pages/adminDashboard";
import ProtectedRoute from "./components/protectedRoute";
import StudentDashboard from "./pages/studentDashboard";
import ManageStudents from "./pages/manageStudent";
import AddStudent from "./pages/addStudent";
import EditStudent from "./pages/editStudent";
import ManageFaculty from "./pages/manageFaculty";
import AddFaculty from "./pages/addFaculty";
import EditFaculty from "./pages/editFaculty";
import { StudentProvider } from "./context/StudentContext";
import { FacultyProvider } from "./context/FacultyContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage2 />} />
          <Route path="/login" element={<LoginPage2 />} />
          <Route path="/student-dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route element={<ProtectedRoute role="admin"><StudentProvider><Outlet /></StudentProvider></ProtectedRoute>}>
            <Route path="/admin/students" element={<ManageStudents />} />
            <Route path="/admin/students/new" element={<AddStudent />} />
            <Route path="/admin/students/edit/:id" element={<EditStudent />} />
          </Route>
          <Route element={<ProtectedRoute role="admin"><FacultyProvider><Outlet /></FacultyProvider></ProtectedRoute>}>
            <Route path="/admin/faculty" element={<ManageFaculty />} />
            <Route path="/admin/faculty/new" element={<AddFaculty />} />
            <Route path="/admin/faculty/edit/:id" element={<EditFaculty />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
