import React, { useState, useEffect } from 'react';
import './Employee.css';
import { postRequest } from '../../utils/utils';
import DateRange from '../../components/DateRange/DateRange';
import { Box, Button } from '@mui/material';
import AdditionalFilter from '../../components/AdditionalFilter';
import { toast, ToastContainer } from 'react-toastify';

function EmployeeInfo() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [isCustomRange, setIsCustomRange] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  
  const totalPages = Math.ceil(totalRecords / pageSize);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value)
  }

  const handleDepartmentFilterChange = (e) => {
    setDepartmentFilter(e.target.value);
    setCurrentPage(1);
  }

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
        if(nameFilter) request.name = nameFilter
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
        if(!employeeData.data || !Object.keys(employeeData.data).length || !employeeData.data.records.length) {
          toast.info(employeeData.msg)
        }
      } else {
        setAttendanceData([]);
        toast.info(employeeData.msg)
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [currentPage, startDate, endDate, departmentFilter]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', height: '100vh', justifyContent: 'flex-start' }}>
      <ToastContainer />
      <h1>Attendance History</h1>
      <div style={{ width: '100%' }}>
        {localStorage.getItem('role') === 'Admin' && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginBottom: '5px' }}>
            <AdditionalFilter 
              includeFilter={['name','department']}
              nameFilter={nameFilter}
              handleDepartmentFilterChange={handleDepartmentFilterChange}
              departmentFilter={departmentFilter}
              handleNameFilterChange={handleNameFilterChange}
              fetchData={fetchEmployeeData}
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
                <th>Date</th>
                {localStorage.getItem('role') === 'Admin' && <th>Name</th>}
                {localStorage.getItem('role') === 'Admin' && <th>Department</th>}
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Total Hours</th>
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
