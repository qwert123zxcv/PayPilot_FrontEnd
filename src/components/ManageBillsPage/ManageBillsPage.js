import React from 'react';
import { Link } from 'react-router-dom';
import './ManageBillsPage.css';

const ManageBillsPage = () => {
  return (
    <div className="manage-bills-container">
      <h1>Manage Bills</h1>
      <div className="icon-button">
        <Link to="/manage-bills/add-new-bill" className="icon-link">
          <div className="icon">➕</div>
          <div className="label">Add New Bill</div>
        </Link>
      </div>
      <div className="icon-button">
        <Link to="/manage-bills/bills-overview" className="icon-link">
          <div className="icon">📋</div>
          <div className="label">Bills Overview</div>
        </Link>
      </div>
      <div className="icon-button">
        <Link to="/manage-bills/reminder-settings" className="icon-link">
          <div className="icon">⏰</div>
          <div className="label">Reminder Settings</div>
        </Link>
      </div>
      <div className="icon-button">
        <Link to="/upcoming-overdue-bills" className="icon-link">
          <div className="icon">🔔</div>
          <div className="label">Upcoming/Overdue Bills</div>
        </Link>
      </div>
      <div className="icon-button">
        <Link to="/snooze-mark-paid" className="icon-link">
          <div className="icon">🛠️</div>
          <div className="label">Snooze/Mark Paid Bills</div>
        </Link>
      </div>
    </div>
  );
};

export default ManageBillsPage;
