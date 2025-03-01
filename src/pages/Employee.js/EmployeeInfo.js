import React, { useState, useEffect } from 'react';
import './Employee.css';
import { postRequest } from '../../utils/utils';
import DateRange from '../../components/DateRange/DateRange';
import { Box } from '@mui/material';

function EmployeeInfo() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const totalPages = Math.ceil(totalRecords / pageSize);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        if (!startDate || !endDate) {
          return;
        }
        setLoading(true);
        const request = {
          email: localStorage.getItem('email'),
          pagination: {
            page: currentPage,
            pageSize: pageSize
          },
        };

        if (startDate && endDate) {
          request.dateRange = {
            startDate,
            endDate
          }
        }

        const employeeData = await postRequest('/attendance/fetchAll', request);

        if (employeeData.status) {
          setAttendanceData(employeeData.data.records);
          setTotalRecords(employeeData.data.pagination.totalCount);
        } else {
          setAttendanceData([]);
        }
      } catch (error) {
        console.error("Error fetching all attendance data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeData();
  }, [currentPage, startDate, endDate]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', height: '100vh', justifyContent: 'flex-start' }}>
      <h1>Attendance Panel</h1>
      <div style={{ width: '100%' }}>

        <DateRange
          startDate={startDate}
          handleStartDateChange={handleStartDateChange}
          endDate={endDate}
          handleEndDateChange={handleEndDateChange}
          setStartDate={setStartDate}
          setEndDate={setEndDate} 
        />

        {loading ? (
          <div>Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((entry) => (
                <tr key={entry.date}>
                  <td>{entry.date}</td>
                  <td>{entry.checkInTime}</td>
                  <td>{entry.checkOutTime}</td>
                  <td>{entry.totalWorkHours.toFixed()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </Box>
  );
}

export default EmployeeInfo;
