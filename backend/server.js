const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // default for XAMPP
  database: 'LUCT'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// ✅ Register Endpoint
app.post('/api/register', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  const checkSql = 'SELECT * FROM users WHERE username = ?';
  db.query(checkSql, [username], (err, results) => {
    if (err) return res.status(500).send({ message: 'Server error' });
    if (results.length > 0) {
      return res.status(409).send({ message: 'User already exists' });
    }

    const insertSql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(insertSql, [username, password, role], (err) => {
      if (err) {
        console.error('❌ Registration error:', err);
        return res.status(500).send({ message: 'Registration failed' });
      }
      res.send({ message: '✅ User registered successfully' });
    });
  });
});

// ✅ Login Endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }

  console.log('🔐 Login attempt:', username);

  const sql = 'SELECT role FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('❌ Login error:', err);
      return res.status(500).send({ message: 'Login failed' });
    }
    if (results.length === 0) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    res.send({ role: results[0].role, username });
  });
});

// ✅ Lecturer Report Submission
app.post('/api/report', (req, res) => {
  const data = req.body;

  const payload = {
    ...data,
    studentsPresent: parseInt(data.studentsPresent) || 0,
    totalRegistered: parseInt(data.totalRegistered) || 0,
    studentsAbsent: parseInt(data.studentsAbsent) || 0
  };

  console.log('📦 Data received:', JSON.stringify(payload, null, 2));

  const sql = 'INSERT INTO lecturer_reports SET ?';
  db.query(sql, payload, (err, result) => {
    if (err) {
      console.error('❌ Report submission error:', err.sqlMessage || err.message);
      return res.status(500).send({ message: 'Submission failed' });
    }
    res.send({ message: '✅ Report submitted successfully', id: result.insertId });
  });
});

// ✅ Get all reports for student monitoring
app.get('/api/reports', (req, res) => {
  db.query('SELECT * FROM lecturer_reports', (err, results) => {
    if (err) {
      console.error('❌ Fetch reports error:', err);
      return res.status(500).send({ message: 'Failed to fetch reports' });
    }
    res.send(results);
  });
});

// ✅ Submit rating (cleaned and fixed)
app.post('/api/rate', (req, res) => {
  const { lecturerName, rating } = req.body;

  if (!lecturerName || !rating || isNaN(rating)) {
    return res.status(400).send({ message: 'Lecturer name and numeric rating required' });
  }

  console.log('📥 Rating received:', { lecturerName, rating });

  const sql = 'INSERT INTO lecturer_ratings (lecturerName, rating) VALUES (?, ?)';
  db.query(sql, [lecturerName, rating], (err) => {
    if (err) {
      console.error('❌ Rating error:', err.sqlMessage || err.message);
      return res.status(500).send({ message: 'Failed to submit rating' });
    }
    res.send({ message: '✅ Rating submitted successfully' });
  });
});
// Submit PRL feedback
app.post('/api/feedback', (req, res) => {
  const { reportId, feedback } = req.body;
  if (!reportId || !feedback) {
    return res.status(400).send({ message: 'Report ID and feedback required' });
  }

  const sql = 'INSERT INTO prl_feedback (reportId, feedback) VALUES (?, ?)';
  db.query(sql, [reportId, feedback], (err) => {
    if (err) {
      console.error('❌ Feedback error:', err.sqlMessage || err.message);
      return res.status(500).send({ message: 'Failed to submit feedback' });
    }
    res.send({ message: '✅ Feedback submitted successfully' });
  });
});

// Assign module to lecturer
app.post('/api/assignments', (req, res) => {
  const { moduleName, lecturerName } = req.body;
  if (!moduleName || !lecturerName) {
    return res.status(400).send({ message: 'Module name and lecturer name required' });
  }

  const sql = 'INSERT INTO pl_assignments (moduleName, lecturerName) VALUES (?, ?)';
  db.query(sql, [moduleName, lecturerName], (err) => {
    if (err) {
      console.error('❌ Assignment error:', err.sqlMessage || err.message);
      return res.status(500).send({ message: 'Failed to assign module' });
    }
    res.send({ message: '✅ Module assigned successfully' });
  });
});


// ✅ Server Start
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
