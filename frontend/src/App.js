import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { useEffect, useState } from 'react';

import Login from './Auth/Login';
import Register from './Auth/Register';
import Dashboard from './Student/Dashboard';
import Reports from './Lecturer/Reports';
import Feedback from './PRL/Feedback';
import Assignments from './PL/Assignments';

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem('role') || '');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/reports"
          element={userRole === 'lecturer' ? <Reports /> : <Navigate to="/login" />}
        />
        <Route
          path="/lecturer/reports"
          element={userRole === 'lecturer' ? <Reports /> : <Navigate to="/login" />}
        />
        <Route
          path="/student/dashboard"
          element={userRole === 'student' ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/prl/feedback"
          element={userRole === 'prl' ? <Feedback /> : <Navigate to="/login" />}
        />
        <Route
          path="/pl/assignments"
          element={userRole === 'pl' ? <Assignments /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
