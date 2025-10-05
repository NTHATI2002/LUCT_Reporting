import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [rating, setRating] = useState('');
  const [selectedLecturer, setSelectedLecturer] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports')
      .then(res => setReports(res.data))
      .catch(err => console.error('❌ Error fetching reports:', err));
  }, []);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/rate', {
        lecturerName: selectedLecturer,
        rating: parseInt(rating)
      });
      alert('✅ Rating submitted!');
      setRating('');
      setSelectedLecturer('');
    } catch (err) {
      console.error('❌ Rating error:', err.response?.data || err.message);
      alert('❌ Failed to submit rating.');
    }
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif'
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '30px'
  };

  const thTdStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'left',
    fontSize: '14px'
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Student Dashboard</h2>

      <h4 style={{ marginBottom: '15px', color: '#333' }}>📊 Monitoring Reports</h4>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Lecturer</th>
            <th style={thTdStyle}>Class</th>
            <th style={thTdStyle}>Week</th>
            <th style={thTdStyle}>Present</th>
            <th style={thTdStyle}>Registered</th>
            <th style={thTdStyle}>Topic</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td style={thTdStyle}>{report.lecturerName}</td>
              <td style={thTdStyle}>{report.className}</td>
              <td style={thTdStyle}>{report.weekOfReporting}</td>
              <td style={thTdStyle}>{report.studentsPresent}</td>
              <td style={thTdStyle}>{report.totalRegistered}</td>
              <td style={thTdStyle}>{report.topicTaught}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 style={{ marginBottom: '15px', color: '#333' }}>⭐ Rate a Lecturer</h4>
      <form onSubmit={handleRatingSubmit}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Lecturer Name</label>
            <input
              type="text"
              value={selectedLecturer}
              onChange={(e) => setSelectedLecturer(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Rating (1–5)</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              required
              style={inputStyle}
            />
          </div>
        </div>
        <button type="submit" style={buttonStyle}>Submit Rating</button>
      </form>
    </div>
  );
};

export default Dashboard;
