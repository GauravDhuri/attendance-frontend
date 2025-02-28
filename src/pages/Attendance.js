import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CustomCalendar from '../components/Calendar/Calendar';

const Attendance = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', height: '100vh', justifyContent: 'flex-start' }}>
      <h1>Employee Attendance Panel</h1>
      <div style={{ width: '90%' }}>
        <CustomCalendar date={date} setDate={handleDateChange} />
      </div>
    </Box>
  );
};

export default Attendance;