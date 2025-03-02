import React from 'react';
import { Box, TextField } from '@mui/material';
import { postRequest } from '../../utils/utils';
import './AttendanceForm.css'
import { toast, ToastContainer } from 'react-toastify';

const AttendanceForm = ({ date, checkInTime, checkOutTime, setCheckInTime, setCheckOutTime, name }) => {

  const handleSubmit = async () => {
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

    if(!name) return

    try {
      const markObj = {
        date: formattedDate,
        name 
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

  return (
    <>
      <ToastContainer />
      <div className='attendance-form'>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '40px',
          marginTop: '20px',
        }}>
          
          <Box sx={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#000032', fontSize: '1.4rem' }}>Check-in Time</div>
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
            <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#000032', fontSize: '1.4rem' }}>Check-out Time</div>
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
