import React from 'react';

const AditionalFilter = ({ emailFilter, handleDepartmentFilterChange, departmentFilter, handleEmailFilterChange }) => {
  const departmentOptions = ['HR', 'Engineering', 'Marketing', 'Sales'];

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        style={{
          fontSize: '1.2rem',
          padding: '8px 16px',
          margin: '5px',
          backgroundColor: '#fbfbfb',
          border: '1px solid #000032',
          borderRadius: '5px',
          width: '250px',
        }}
        value={emailFilter}
        onChange={(e) => handleEmailFilterChange(e)}
      />
      <select
        value={departmentFilter}
        onChange={(e) => handleDepartmentFilterChange(e)}
        style={{
          fontSize: '1.2rem',
          padding: '8px 16px',
          margin: '5px',
          backgroundColor: '#fbfbfb',
          border: '1px solid #000032',
          borderRadius: '5px',
          color: 'black',
          width: '250px',
          cursor: 'pointer',
        }}
      >
        <option value="" style={{ color: '#8e8e8e' }}>Select Department</option>
        {departmentOptions.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AditionalFilter;
