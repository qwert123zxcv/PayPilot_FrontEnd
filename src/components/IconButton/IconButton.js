import React from 'react';
import { Link } from 'react-router-dom';
import './IconButton.css';

const IconButton = ({ icon, label, to }) => {
  return (
    <Link to={to} className="icon-button">
      <div className="icon">{icon}</div>
      <div className="label">{label}</div>
    </Link>
  );
};

export default IconButton;
