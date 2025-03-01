import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { postRequest } from '../utils/utils';

const AttendanceForm = ({ date }) => {
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

  const handleSubmit = async () => {
    const email = localStorage.getItem('email') || '';

    const markAttendance = await postRequest('/attendance/mark', {
      date,
      checkInTime, 
      checkOutTime, 
      email 
    });
    if(markAttendance.status) {
      console.log('Attendance added successfully')
    }
  };

  return (
    <Box sx={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
      <Typography variant="h4">Set Attendance for {date.toDateString()}</Typography>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '40px',
        marginTop: '20px',
      }}>
        
        <Box sx={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Check-in Time</div>
          <TextField
            type="time"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
            sx={{
              width: '200px',
              height: '56px',
            }}
          />
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Check-out Time</div>
          <TextField
            type="time"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
            sx={{
              width: '200px',
              height: '56px',
            }}
          />
        </Box>
      </Box>
      
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: '20px' }}>
        Submit
      </Button>
    </Box>
  );
};

export default AttendanceForm;
