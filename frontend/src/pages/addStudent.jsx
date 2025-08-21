// src/pages/AddStudent.jsx

import React, { useState, useContext } from 'react'; // Import useContext
import { useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentContext'; // Import the context
import { Box, Button, TextField, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function AddStudent() {
  const { addStudent } = useContext(StudentContext); // Get function from context
  const navigate = useNavigate();
  const [rollNo, setRollNo] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addStudent({ rollNo, name, department }); // Use context function
    navigate('/admin/students');
  };

  // ... the rest of the component's return JSX stays the same
  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Add a New Student</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* All TextField, Select, and Button components remain unchanged */}
        <TextField margin="normal" required fullWidth label="Roll Number" value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
        <TextField margin="normal" required fullWidth label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <FormControl fullWidth margin="normal">
          <InputLabel>Department</InputLabel>
          <Select value={department} label="Department" onChange={(e) => setDepartment(e.target.value)}>
            <MenuItem value={'Computer Science'}>Computer Science</MenuItem>
            <MenuItem value={'Mechanical Engg.'}>Mechanical Engg.</MenuItem>
            <MenuItem value={'Electrical Engg.'}>Electrical Engg.</MenuItem>
            <MenuItem value={'Electronics'}>Electronics</MenuItem>
            <MenuItem value={'Civil Engg.'}>Civil Engg.</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Add Student</Button>
      </Box>
    </Paper>
  );
}

export default AddStudent;
