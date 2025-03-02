import React, { useState, useEffect } from 'react';
import './AttendanceHistory.css';
import { postRequest } from '../../utils/utils';
import DateRange from '../DateRange/DateRange';
import { Box } from '@mui/material';
import AdditionalFilter from '../AdditionalFilter';
import { toast, ToastContainer } from 'react-toastify';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function AttendanceHistory() {
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
  const [exportOption, setExportOption] = useState(null);
  
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
        setTotalRecords(employeeData.data.pagination?.totalCount || 0);
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

  const handleExport = async (type) => {
    try {
      const request = {
        skipPagination: true
      };

      if(nameFilter) request.name = nameFilter
      if(departmentFilter) request.department = departmentFilter
      if(startDate && endDate) {
        request.dateRange = {
          startDate,
          endDate
        };
      }

      const fetchAllData = await postRequest('/attendance/fetchAll', request);
      let data
      if(fetchAllData.status && fetchAllData.data?.records.length) {
        data = fetchAllData.data.records;
      } else {
        throw data;
      }
      if (type === 'csv') {
        exportToCSV(data);
      } else if (type === 'excel') {
        exportToExcel(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const exportToCSV = (data) => {
    const csvRows = [];
    const headers = [
      'Date',
      'Name',
      'Department',
      'Check-In',
      'Check-Out',
      'Total Hours',
    ];
    csvRows.push(headers.join(','));

    data.forEach((entry) => {
      const row = [
        entry.date,
        entry.name,
        entry.department,
        entry.checkInTime,
        entry.checkOutTime,
        entry.totalWorkHours,
      ];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    saveAs(blob, 'attendance_data.csv');
  };

  const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance Data');
    XLSX.writeFile(wb, 'attendance_data.xlsx');
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [currentPage, startDate, endDate, departmentFilter]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', height: '100vh', justifyContent: 'flex-start' }}>
      <ToastContainer />
      <h1>Attendance History</h1>
      <div style={{ width: '90%' }}>
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

        <div className='employee-container'>
          <select
            value={exportOption}
            onChange={(e) => setExportOption(e.target.value)}
          >
          <option value="" style={{ color: '#8e8e8e' }}>Export As</option>
          {['csv', 'excel'].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        
          <button
            className="export-button"
            onClick={() => handleExport(exportOption)}
            disabled={!exportOption || (!attendanceData && !attendanceData.length)}
          >
            Export
          </button>
        </div>

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
              {attendanceData && attendanceData.length > 0 ? (
                attendanceData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    {localStorage.getItem('role') === 'Admin' && <td>{entry.name}</td>}
                    {localStorage.getItem('role') === 'Admin' && <td>{entry.department}</td>}
                    <td>{entry.checkInTime}</td>
                    <td>{entry.checkOutTime}</td>
                    <td>{(typeof entry.totalWorkHours === 'number') ? entry.totalWorkHours.toFixed(2) : entry.totalWorkHours}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={localStorage.getItem('role') === 'Admin' ? 6 : 3} style={{ textAlign: 'center', color: 'gray' }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1 || totalRecords === 0}>
          Previous
        </button>
        <span> Page {totalRecords === 0 ? 0 : currentPage} of {totalPages} </span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages || totalRecords === 0}>
          Next
        </button>
      </div>
    </Box>
  );
}

export default AttendanceHistory;
