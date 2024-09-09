import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import your CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home 🏠</Link>
        </li>
        <li className="navbar-item">
          <Link to="/manage-bills" className="navbar-link">Manage Bills 🗂️</Link>
        </li>
        <li className="navbar-item">
          <Link to="/manage-bills/bills-overview" className="navbar-link">Bills Overview 📋</Link>
        </li>
        <li className="navbar-item">
          <Link to="/manage-bills/add-new-bill" className="navbar-link">Add New Bill ➕</Link>
        </li>
        <li className="navbar-item">
          <Link to="/manage-bills/reminder-settings" className="navbar-link">Reminder Settings ⏰</Link>
        </li>
        <li className="navbar-item dropdown">
          <Link to="/manage-bills/upcoming-overdue-bills" className="navbar-link">Upcoming/Overdue Bills 🔔</Link>
          <ul className="dropdown-menu">
            <li>
              <Link to="/manage-bills/upcoming-overdue-bills/overdue" className="dropdown-link">Overdue Bills ⏳</Link>
            </li>
            <li>
              <Link to="/manage-bills/upcoming-overdue-bills/upcoming" className="dropdown-link">Upcoming Bills 📅</Link>
            </li>
          </ul>
        </li>
        <li className="navbar-item">
          <Link to="/manage-bills/snooze-mark-paid" className="navbar-link">Snooze/Mark Paid 🛠️</Link>
        </li>
        <li className="navbar-item">
          <Link to="/manage-bills/update-or-delete-bill" className="navbar-link">Update/Delete Bill 🛠️</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
