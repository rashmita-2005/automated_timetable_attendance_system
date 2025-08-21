
        
// src/AdminDashboard.jsx

import React from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>Welcome, Admin!</Typography>
        </Grid>
        
        <Grid item xs={12} md={4} lg={3}>
          <Paper component={Link} to="/admin/students" sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 180, justifyContent: 'center', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6">Manage Students</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          {/* This card is now a link */}
          <Paper component={Link} to="/admin/faculty" sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 180, justifyContent: 'center', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6">Manage Faculty</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4} lg={3}>
          <Paper component={Link} to="/admin/timetable/edit" sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 180, justifyContent: 'center', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6">Edit Timetable</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminDashboard;
