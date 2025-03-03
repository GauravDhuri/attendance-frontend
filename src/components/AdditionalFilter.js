import React from 'react';

const AditionalFilter = ({ nameFilter, handleDepartmentFilterChange, departmentFilter, handleNameFilterChange, fetchData, includeFilter }) => {
  const departmentOptions = ['HR', 'Engineering', 'Marketing', 'Sales'];

  return (
    <>
      {includeFilter.includes('name') && localStorage.getItem('role') === 'Admin' ? <>
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
          value={nameFilter}
          onChange={(e) => handleNameFilterChange(e)}
        />
        <button onClick={() => fetchData()} 
          style={{
            fontSize: '1.4rem',
            padding: '8px 16px',
            margin: '5px',
            backgroundColor: '#000032',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}  
        >Search</button>
      </> : <></>}
      {includeFilter.includes('department') ? <select
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
          cursor: 'pointer'
        }}
      >
        <option value="" style={{ color: '#8e8e8e' }}>Select Department</option>
        {departmentOptions.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>: <></>}
    </>
  );
};

export default AditionalFilter;
