import React, { useState } from 'react';
import axios from 'axios';

const initialFormData = {
  facultyName: '',
  className: '',
  weekOfReporting: '',
  courseName: '',
  courseCode: '',
  lecturerName: '',
  studentsPresent: '',
  totalRegistered: '',
  venue: '',
  scheduledTime: '',
  topicTaught: '',
  learningOutcomes: '',
  recommendations: ''
};

const Reports = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentsAbsent = parseInt(formData.totalRegistered || 0) - parseInt(formData.studentsPresent || 0);

    const payload = {
      ...formData,
      studentsAbsent: isNaN(studentsAbsent) ? '' : studentsAbsent
    };

    try {
      await axios.post('http://localhost:5000/api/report', payload);
      alert('✅ Report submitted successfully!');
      setFormData(initialFormData);
    } catch (err) {
      console.error('❌ Submission error:', err.response?.data || err.message);
      alert('❌ Submission failed. Please check your inputs or server.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px'
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block'
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '40px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Lecturer Reporting Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Faculty Name</label>
            <input type="text" name="facultyName" value={formData.facultyName} onChange={handleChange} required style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Class Name</label>
            <input type="text" name="className" value={formData.className} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Week of Reporting</label>
            <input type="text" name="weekOfReporting" value={formData.weekOfReporting} onChange={handleChange} required style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Scheduled Lecture Time</label>
            <input type="time" name="scheduledTime" value={formData.scheduledTime} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Course Name</label>
            <select name="courseName" value={formData.courseName} onChange={handleChange} required style={inputStyle}>
              <option value="">Select Course</option>
              <option value="Diploma in Information Technology">Diploma in Information Technology</option>
              <option value="Diploma in Business Information Technology">Diploma in Business Information Technology</option>
              <option value="Bsc Degree in Business Information Technology">Bsc Degree in Business Information Technology</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Course Code</label>
            <input type="text" name="courseCode" value={formData.courseCode} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Lecturer’s Name</label>
            <input type="text" name="lecturerName" value={formData.lecturerName} onChange={handleChange} required style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Students Present</label>
            <input type="number" name="studentsPresent" value={formData.studentsPresent} onChange={handleChange} required style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Total Registered</label>
            <input type="number" name="totalRegistered" value={formData.totalRegistered} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        <label style={labelStyle}>Venue</label>
        <input type="text" name="venue" value={formData.venue} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Topic Taught</label>
        <textarea name="topicTaught" rows="2" value={formData.topicTaught} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Learning Outcomes</label>
        <textarea name="learningOutcomes" rows="2" value={formData.learningOutcomes} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Lecturer’s Recommendations</label>
        <textarea name="recommendations" rows="2" value={formData.recommendations} onChange={handleChange} required style={inputStyle} />

        <button type="submit" style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default Reports;
