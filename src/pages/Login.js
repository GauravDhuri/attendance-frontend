import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCookie, postRequest } from '../utils/utils';
import { useUser } from '../context/userContext';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const login = await postRequest('/user/login', { email: email, password: password });
    if(login.status) {
      setUser({ username: login.data.userName, email: login.data.email });
      const token = getCookie('token');
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      console.log('Login Failed', login);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '20px' }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;