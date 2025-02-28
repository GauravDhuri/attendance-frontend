import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Employee from './pages/Employee';

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
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        {isAuthenticated && <Navbar handleLogout={handleLogout}/>}
        
        <div style={{ paddingLeft: '20px', paddingRight: '20px', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/employee" element={<Employee />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;