import React from 'react';

const Dashboard = () => {
  const userName = localStorage.getItem('userName') || '';

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
    </div>
  );
};

export default Dashboard;