import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { postRequest } from '../../utils/utils';
import './AttendanceForm.css'
import { toast, ToastContainer } from 'react-toastify';

const AttendanceForm = ({ date }) => {
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

  const handleSubmit = async () => {
    const email = localStorage.getItem('email') || '';
    const formattedDate = date.toLocaleDateString('en-CA');

    if (checkOutTime && !checkInTime) {
      toast.error('You must mark check-in time before check-out time.');
      return;
    }
  
    if (checkInTime && checkOutTime) {
      const checkIn = new Date(`${formattedDate} ${checkInTime}`);
      const checkOut = new Date(`${formattedDate} ${checkOutTime}`);
  
      if (checkOut <= checkIn) {
        toast.error('Check-out time must be after check-in time.');
        return;
      }
    }

    try {
      const markObj = {
        date: formattedDate,
        email 
      }
      if(checkInTime) markObj.checkInTime = checkInTime;
      if(checkOutTime) markObj.checkOutTime = checkOutTime;
      const markAttendance = await postRequest('/attendance/mark', markObj);
      if(markAttendance.status) {
        toast.success('Attendance mark successfully');
      } else {
        toast.error('Attendance mark failed');
      }
    } catch (error) {
      toast.error('Attendance mark failed');
    }
  }

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const formattedDate = date.toLocaleDateString('en-CA');
        const attendanceData = await postRequest('/attendance/fetch', {
          date: formattedDate,
          email: localStorage.getItem('email') || '',
        });
  
        if(attendanceData.status && Object.keys(attendanceData.data).length) {
          setCheckInTime(attendanceData.data.checkInTime)
           setCheckOutTime(attendanceData.data.checkOutTime || '')
        } else {
          setCheckInTime('')
          setCheckOutTime('')
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setCheckInTime('')
        setCheckOutTime('')
      }
    };
  
    fetchAttendanceData()
  }, [date]);

  return (
    <>
      <ToastContainer position='top-center'/>
      <div className='attendance-form'>
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
                width: '120px',
                height: '40px',
                '& input': {
                  padding: '8px'
                },
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
                width: '120px',
                height: '40px',
                '& input': {
                  padding: '8px'
                },
              }}
            />
          </Box>
        </Box>
        
        <button onClick={handleSubmit} >
          Submit
        </button>
      </div>
    </>
  );
};

export default AttendanceForm;
