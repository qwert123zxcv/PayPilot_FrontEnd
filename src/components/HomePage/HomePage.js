import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import your CSS for styling if needed

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to PayPilot</h1>
      <div className="icons-container">
        <Link to="/schedule-payments" className="icon-link">
          <div className="icon-button">
            <span className="icon">📅</span>
            <span className="label">Schedule Payments</span>
          </div>
        </Link>
        <Link to="/manage-bills" className="icon-link">
          <div className="icon-button">
            <span className="icon">🗂️</span>
            <span className="label">Manage Bills</span>
          </div>
        </Link>
        <Link to="/track-payments" className="icon-link">
          <div className="icon-button">
            <span className="icon">📈</span>
            <span className="label">Track Payments</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
