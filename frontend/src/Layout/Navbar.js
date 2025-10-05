import { Link } from 'react-router-dom';

const Navbar = () => {
  const role = localStorage.getItem('role');

  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>

      {role === 'student' && <Link to="/student/dashboard">Dashboard</Link>}
      {role === 'lecturer' && <Link to="/lecturer/reports">Reports</Link>}
      {role === 'prl' && <Link to="/prl/feedback">Feedback</Link>}
      {role === 'pl' && <Link to="/pl/assignments">Assignments</Link>}
    </nav>
  );
};

export default Navbar;
