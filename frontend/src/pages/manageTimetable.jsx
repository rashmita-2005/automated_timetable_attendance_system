import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Schedule, Add, AutoFixHigh } from '@mui/icons-material';
import { apiClient } from '../services/api';

const ManageTimetable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pageError, setPageError] = useState('');
  const [timetable, setTimetable] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [courseId, setCourseId] = useState('');
  const [studentGroupId, setStudentGroupId] = useState('');
  const [classroomId, setClassroomId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [day, setDay] = useState('monday');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [weekNumber, setWeekNumber] = useState('');
  const [semester, setSemester] = useState('');
  const [academicYear, setAcademicYear] = useState('');

  const handleGenerateTimetable = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await apiClient.get('/timetable/generate', {
        params: {
          semester: 5,
          academicYear: '2024-25',
          department: 'Computer Science'
        }
      });
      
      if (response.data.schedule?.length > 0) {
        // Save the generated timetable
        await apiClient.post('/timetable/generate/save', {
          schedule: response.data.schedule
        });
        setSuccess(`Timetable generated successfully! ${response.data.totalSlots} slots created.`);
      } else {
        setError('No timetable slots could be generated. Please check constraints.');
      }
    } catch (err) {
      console.error('Timetable generation error:', err);
      setError(err.response?.data?.message || 'Failed to generate timetable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await apiClient.get('/timetable');
        setTimetable(res.data.timetable || []);
      } catch (err) {
        console.error('Failed to load timetable', err);
        setPageError('Failed to load timetable');
      }
    };
    fetchTimetable();
  }, []);

  const resetForm = () => {
    setCourseId('');
    setStudentGroupId('');
    setClassroomId('');
    setTeacherId('');
    setDay('monday');
    setStartTime('');
    setEndTime('');
    setWeekNumber('');
    setSemester('');
    setAcademicYear('');
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    const duration = (eh * 60 + em) - (sh * 60 + sm);
    if (duration <= 0 || isNaN(duration)) {
      setError('End time must be after start time');
      return;
    }
    try {
      await apiClient.post('/timetable', {
        courseId,
        studentGroupId,
        classroomId,
        teacherId,
        day,
        startTime,
        duration,
        weekNumber: Number(weekNumber),
        semester: Number(semester),
        academicYear
      });
      setSuccess('Timetable entry created successfully');
      resetForm();
      const res = await apiClient.get('/timetable');
      setTimetable(res.data.timetable || []);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create timetable');
    }
  };

  // If there's a critical page error, show error state
  if (pageError) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>Manage Timetable</Typography>
        <Alert severity="error" sx={{ mb: 2 }}>
          {pageError}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => {
            setPageError('');
            window.location.reload();
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Timetable
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <AutoFixHigh sx={{ mr: 1 }} />
              Auto-Generate Timetable
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Automatically generate a conflict-free timetable based on courses, faculty availability, and classroom constraints.
            </Typography>
            <Button
              variant="contained"
              onClick={handleGenerateTimetable}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <AutoFixHigh />}
            >
              {loading ? 'Generating...' : 'Generate Timetable'}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Add sx={{ mr: 1 }} />
              Manual Entry
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Manually add individual timetable entries with custom scheduling.
            </Typography>
            {showForm ? (
              <Box component="form" onSubmit={handleManualSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Course ID"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Student Group ID"
                  value={studentGroupId}
                  onChange={(e) => setStudentGroupId(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Classroom ID"
                  value={classroomId}
                  onChange={(e) => setClassroomId(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Teacher ID"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  required
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Day</InputLabel>
                  <Select
                    value={day}
                    label="Day"
                    onChange={(e) => setDay(e.target.value)}
                  >
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((d) => (
                      <MenuItem key={d} value={d}>
                        {d.charAt(0).toUpperCase() + d.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Start Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="End Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Week Number"
                  type="number"
                  value={weekNumber}
                  onChange={(e) => setWeekNumber(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Semester"
                  type="number"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Academic Year"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  required
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button onClick={() => { setShowForm(false); resetForm(); }} sx={{ mr: 1 }}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                </Box>
              </Box>
            ) : (
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() => setShowForm(true)}
              >
                Add Manual Entry
              </Button>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Schedule sx={{ mr: 1 }} />
              Current Timetable
            </Typography>
            {timetable.length === 0 ? (
              <Typography variant="body2" color="textSecondary">
                No timetable entries available.
              </Typography>
            ) : (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Course</TableCell>
                      <TableCell>Day</TableCell>
                      <TableCell>Start Time</TableCell>
                      <TableCell>End Time</TableCell>
                      <TableCell>Classroom</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {timetable.map((entry) => (
                      <TableRow key={entry._id}>
                        <TableCell>{entry.courseId?.name}</TableCell>
                        <TableCell>{entry.day.charAt(0).toUpperCase() + entry.day.slice(1)}</TableCell>
                        <TableCell>{entry.startTime}</TableCell>
                        <TableCell>{entry.endTime}</TableCell>
                        <TableCell>{entry.classroomId?.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManageTimetable;