import React, { useState, useEffect } from 'react';
import './Employee.css';
import { postRequest } from '../../utils/utils';
import DateRange from '../../components/DateRange/DateRange';
import { Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AdditionalFilter from '../../components/AdditionalFilter';

function EmployeeInfo() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  
  const totalPages = Math.ceil(totalRecords / pageSize);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const [debouncedEmailFilter, setDebouncedEmailFilter] = useState(emailFilter);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  const [isCustomRange, setIsCustomRange] = useState(false);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleEmailFilterChange = (e) => {
    const value = e.target.value;
    setEmailFilter(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(setTimeout(() => {
      setDebouncedEmailFilter(value);
    }, 2000));
  };

  const handleDepartmentFilterChange = (e) => setDepartmentFilter(e.target.value);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        const request = {
          pagination: {
            page: currentPage,
            pageSize: pageSize
          },
        };

        if(localStorage.getItem('role') === 'Admin') {
          if(debouncedEmailFilter) request.name = debouncedEmailFilter
        } else {
          request.email = localStorage.getItem('email')
        }

        if(departmentFilter) {
          request.department = departmentFilter
        }

        if(isCustomRange) {
          if(!startDate || !endDate) {
            return;
          }
        }
        if (startDate && endDate) {
          request.dateRange = {
            startDate,
            endDate
          };
        }

        const employeeData = await postRequest('/attendance/fetchAll', request);

        if (employeeData.status) {
          setAttendanceData(employeeData.data.records);
          setTotalRecords(employeeData.data?.pagination?.totalCount || 0);
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
  }, [currentPage, startDate, endDate, debouncedEmailFilter, departmentFilter]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', height: '100vh', justifyContent: 'flex-start' }}>
      <h1>{localStorage.getItem('role') === 'Admin' ? 'Admin Panel' : 'Attendance History'}</h1>
      <div style={{ width: '100%' }}>
        {localStorage.getItem('role') === 'Admin' && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginBottom: '5px' }}>
            <AdditionalFilter 
              emailFilter={emailFilter}
              handleDepartmentFilterChange={handleDepartmentFilterChange}
              departmentFilter={departmentFilter}
              handleEmailFilterChange={handleEmailFilterChange}
            />
          </Box>
        )}

        <DateRange
          startDate={startDate}
          handleStartDateChange={handleStartDateChange}
          endDate={endDate}
          handleEndDateChange={handleEndDateChange}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          isCustomRange={isCustomRange}
          setIsCustomRange={setIsCustomRange}
        />

        {loading ? (
          <div>Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('date')}>Date</th>
                {localStorage.getItem('role') === 'Admin' && <th onClick={() => handleSort('name')}>Name</th>}
                {localStorage.getItem('role') === 'Admin' && <th onClick={() => handleSort('department')}>Department</th>}
                <th onClick={() => handleSort('checkInTime')}>Check-In</th>
                <th onClick={() => handleSort('checkOutTime')}>Check-Out</th>
                <th onClick={() => handleSort('totalWorkHours')}>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData && attendanceData.map((entry,index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  {localStorage.getItem('role') === 'Admin' && <td>{entry.name}</td>}
                  {localStorage.getItem('role') === 'Admin' && <td>{entry.department}</td>}
                  <td>{entry.checkInTime}</td>
                  <td>{entry.checkOutTime}</td>
                  <td>{(typeof entry.totalWorkHours === 'number') ? entry.totalWorkHours.toFixed(2) : entry.totalWorkHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1 || totalRecords === 0}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages || totalRecords === 0}>
          Next
        </button>
      </div>
    </Box>
  );
}

export default EmployeeInfo;
