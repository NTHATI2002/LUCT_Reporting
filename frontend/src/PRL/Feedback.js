import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [reports, setReports] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [reportId, setReportId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports')
      .then(res => setReports(res.data))
      .catch(err => console.error('❌ Error fetching reports:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/feedback', {
        reportId,
        feedback
      });
      alert('✅ Feedback submitted!');
      setReportId('');
      setFeedback('');
    } catch (err) {
      console.error('❌ Feedback error:', err);
      alert('❌ Failed to submit feedback.');
    }
  };

  const containerStyle = {
    maxWidth: '800px',
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
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>PRL Feedback & Monitoring</h2>

      <h4 style={{ marginBottom: '15px', color: '#333' }}>📊 Reports</h4>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>ID</th>
            <th style={thTdStyle}>Lecturer</th>
            <th style={thTdStyle}>Class</th>
            <th style={thTdStyle}>Topic</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, i) => (
            <tr key={i}>
              <td style={thTdStyle}>{r.id}</td>
              <td style={thTdStyle}>{r.lecturerName}</td>
              <td style={thTdStyle}>{r.className}</td>
              <td style={thTdStyle}>{r.topicTaught}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 style={{ marginBottom: '15px', color: '#333' }}>📝 Submit Feedback</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Report ID"
          value={reportId}
          onChange={(e) => setReportId(e.target.value)}
          required
          style={inputStyle}
        />
        <textarea
          placeholder="Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
          rows="3"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
