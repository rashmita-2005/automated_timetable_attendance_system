import React, { useContext } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}
      </Typography>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}

export default StudentDashboard;
