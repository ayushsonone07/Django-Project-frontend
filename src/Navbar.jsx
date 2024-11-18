import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-container"> {/* This div will trigger the hover effect */}
      <h3>menu</h3>
      <div className="navbar">
        <ul>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/leaveForm" className="nav-link">Apply Leave</Link></li>
          <li><Link to="/leaves" className="nav-link">Check Leaves</Link></li>
          <li><Link to="/tasks" className="nav-link">View Tasks</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
