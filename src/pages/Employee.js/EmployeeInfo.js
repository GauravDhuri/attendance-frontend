import React, { useState, useEffect } from 'react';
import './Employee.css';

function EmployeeInfo() {
  const [attendanceData, setAttendanceData] = useState([
      {
        "date": "2025-02-01",
        "checkIn": "09:00 AM",
        "checkOut": "05:00 PM",
        "totalHours": 8
      },
      {
        "date": "2025-02-02",
        "checkIn": "09:30 AM",
        "checkOut": "06:00 PM",
        "totalHours": 8.5
      },
      {
        "date": "2025-02-02",
        "checkIn": "09:30 AM",
        "checkOut": "06:00 PM",
        "totalHours": 8.5
      },
      {
        "date": "2025-02-02",
        "checkIn": "09:30 AM",
        "checkOut": "06:00 PM",
        "totalHours": 8.5
      },
      {
        "date": "2025-02-02",
        "checkIn": "09:30 AM",
        "checkOut": "06:00 PM",
        "totalHours": 8.5
      },
    ]);
  const [totalRecords, setTotalRecords] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const totalWorkHours = attendanceData.reduce((acc, curr) => acc + curr.totalHours, 0);

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              {attendanceData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.checkIn}</td>
                  <td>{entry.checkOut}</td>
                  <td>{entry.totalHours}</td>
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

      <div className="total-hours">
        <h3>Total Work Hours: {totalWorkHours} hours</h3>
      </div>
    </div>
  );
}

export default EmployeeInfo;