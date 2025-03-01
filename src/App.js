import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Attendance from './pages/Attendance';
import EmployeeInfo from './pages/Employee.js/EmployeeInfo';
import PrivateRoute from './components/ProtectedRoute';
import { UserContextProvider } from './context/userContext';

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
    setIsAuthenticated(false);
  }

  return (
    <UserContextProvider>
      <Router>
        <div style={{ display: 'flex', height: '100vh' }}>
          {isAuthenticated && <Navbar handleLogout={handleLogout}/>}

          <div style={{ paddingLeft: '40px', paddingRight: '40px', width: '100%' }}>
            <Routes>
              <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
              
              <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Dashboard />} />} />
              <Route path='/employeeInfo' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<EmployeeInfo />} />} />
              <Route path="/attendance" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Attendance />} />} />
              <Route path="/admin" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Admin />} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
