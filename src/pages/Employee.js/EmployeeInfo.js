import React, { useState, useEffect } from 'react';
import './Employee.css';
import { postRequest } from '../../utils/utils';

function EmployeeInfo() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(totalRecords / pageSize);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        const employeeData = await postRequest('/attendance/fetchAll', { 
          email: localStorage.getItem('email'),
          pagination: {
            page: currentPage,
            pageSize: pageSize
          }
        });
        
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
  }, [currentPage]);

  return (
    <div className="employee-container">
      <div className="attendance-table">
        <h2>Attendance History</h2>
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
                  <td>{entry.totalWorkHours}</td>
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
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default EmployeeInfo;
