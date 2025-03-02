import React from 'react';
import { Box, Typography, Card, CardContent, Paper, Divider } from '@mui/material';

const Dashboard = () => {
  const userName = localStorage.getItem('userName') || '';
  const userEmail = localStorage.getItem('email') || '';
  const userRole = localStorage.getItem('role') || '';
  const userDepartment = localStorage.getItem('department') || '';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        padding: 3,
        marginTop: '50px'
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 500,
          borderRadius: 5,
          boxShadow: 10,
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}
      >
        <CardContent sx={{ textAlign: 'center', padding: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: '600',
              color: '#2f3b52',
              marginBottom: 3,
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            Welcome, {userName}!
          </Typography>
          <Divider sx={{ margin: '20px 0' }} />

          <Box sx={{ textAlign: 'left' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: '500',
                color: '#5a6f89',
                marginBottom: 1,
              }}
            >
              <strong>Name:</strong> {userName}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: '500',
                color: '#5a6f89',
                marginBottom: 1,
              }}
            >
              <strong>Email:</strong> {userEmail}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: '500',
                color: '#5a6f89',
                marginBottom: 1,
              }}
            >
              <strong>Role:</strong> {userRole}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: '500',
                color: '#5a6f89',
                marginBottom: 3,
              }}
            >
              <strong>Department:</strong> {userDepartment}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
