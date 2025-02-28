import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <Drawer
      sx={{
        width: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 200,
          boxSizing: 'border-box',
          paddingTop: 2,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem button onClick={() => handleNavigation('/dashboard')}>
          <ListItemText primary="Dashboard" sx={{ paddingLeft: '20px', fontWeight: 'bold' }} />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/employeeInfo')}>
          <ListItemText primary="Employee Panel" sx={{ paddingLeft: '20px', fontWeight: 'bold' }} />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/attendance')}>
          <ListItemText primary="Attendance Panel" sx={{ paddingLeft: '20px', fontWeight: 'bold' }} />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/admin')}>
          <ListItemText primary="Admin Panel" sx={{ paddingLeft: '20px', fontWeight: 'bold' }} />
        </ListItem>
        <ListItem button onClick={handleLogoutClick}>
          <ListItemText primary="Logout" sx={{ paddingLeft: '20px', fontWeight: 'bold' }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Navbar;