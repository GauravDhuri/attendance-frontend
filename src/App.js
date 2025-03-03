import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import AttendanceHistory from './components/AttendanceHistory/AttendanceHistory';
import PrivateRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('department');
    setIsAuthenticated(false);
  }

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        {isAuthenticated && <Navbar handleLogout={handleLogout} />}

        <div style={{ paddingLeft: '40px', paddingRight: '40px', width: '100%' }}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> :<Login setIsAuthenticated={setIsAuthenticated} />} />

            <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Dashboard />} />} />
            <Route path="/attendance-panel" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Attendance />} />} />
            <Route path='/attendace-history' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AttendanceHistory />} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
