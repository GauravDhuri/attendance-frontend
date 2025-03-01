import React from 'react';
import { useUser } from './../context/userContext';

const Dashboard = () => {
  const { user } = useUser(); 

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
    </div>
  );
};

export default Dashboard;