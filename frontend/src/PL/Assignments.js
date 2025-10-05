import React, { useState } from 'react';
import axios from 'axios';

const Assignments = () => {
  const [moduleName, setModuleName] = useState('');
  const [lecturerName, setLecturerName] = useState('');

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/assignments', {
        moduleName,
        lecturerName
      });
      alert('✅ Module assigned!');
      setModuleName('');
      setLecturerName('');
    } catch (err) {
      console.error('❌ Assignment error:', err);
      alert('❌ Failed to assign module.');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '60px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>PL Assignments</h2>
      <form onSubmit={handleAssign}>
        <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Module Name</label>
        <input
          type="text"
          placeholder="Module Name"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        />
        <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Lecturer Name</label>
        <input
          type="text"
          placeholder="Lecturer Name"
          value={lecturerName}
          onChange={(e) => setLecturerName(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Assign Module
        </button>
      </form>
    </div>
  );
};

export default Assignments;
