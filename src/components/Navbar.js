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
        <ListItem button onClick={() => handleNavigation('/employee')}>
          <ListItemText primary="Employee" sx={{ paddingLeft: '20px', fontWeight: 'bold' }} />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/admin')}>
          <ListItemText primary="Admin" sx={{ paddingLeft: '20px', fontWeight: 'bold' }} />
        </ListItem>
        <ListItem button onClick={handleLogoutClick}>
          <ListItemText primary="Logout" sx={{ paddingLeft: '20px', fontWeight: 'bold' }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Navbar;