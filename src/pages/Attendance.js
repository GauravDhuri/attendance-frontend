import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CustomCalendar from '../components/Calendar/Calendar';
import AttendanceForm from '../components/AttendanceForm/AttendanceForm';
import { postRequest } from '../utils/utils';
import { toast } from 'react-toastify';
import AditionalFilter from '../components/AdditionalFilter';

const Attendance = () => {
  const [date, setDate] = useState(new Date());
  const [nameFilter, setNameFilter] = useState(localStorage.getItem('userName'));
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
    fetchAttendanceData(newDate);
  };

  const fetchAttendanceData = async (newDate) => {
    try {
      const formattedDate = newDate.toLocaleDateString('en-CA');
      const fetchReqObj = {
        date: formattedDate
      }
      if(localStorage.getItem('role') === 'Admin') {
        fetchReqObj.name = nameFilter
      } else {
        fetchReqObj.email = localStorage.getItem('email')
      }
      const attendanceData = await postRequest('/attendance/fetch', fetchReqObj);
      if(attendanceData.status && Object.keys(attendanceData.data).length) {
        setCheckInTime(attendanceData.data.checkInTime)
        setCheckOutTime(attendanceData.data.checkOutTime || '')
      } else {
        setCheckInTime('')
        setCheckOutTime('')
      }
    } catch (error) {
      toast.error('Something went wrong')
      setCheckInTime('')
      setCheckOutTime('')
    }
  };

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value)
  }

  useEffect(() => {
    fetchAttendanceData(date);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', height: '100vh', justifyContent: 'flex-start' }}>
      <h1>Attendance Panel</h1>
      <Typography variant='h4'>Viewing Attendance of {nameFilter}</Typography>
      <div style={{ width: '90%'}}>
        <AditionalFilter includeFilter={['name']} handleNameFilterChange={handleNameFilterChange} fetchData={() => fetchAttendanceData(date)}/>
        <CustomCalendar date={date} setDate={handleDateChange} />
        <AttendanceForm 
          date={date}
          checkInTime={checkInTime}
          setCheckInTime={setCheckInTime}
          checkOutTime={checkOutTime}
          setCheckOutTime={setCheckOutTime}
          name={nameFilter}
        />
      </div>
    </Box>
  );
};

export default Attendance;