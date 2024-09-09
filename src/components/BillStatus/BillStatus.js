import React from 'react';
import { Link} from 'react-router-dom';
import './BillStatus.css';

const BillStatus = () => {
  return (
    <>
      <Link to="/manage-bills/upcoming-overdue-bills/overdue" className="icon-link">
        <div className="icon-button">
          <span className="icon">💵</span>
          <span className="label">Overdue</span>
        </div>
      </Link>

      <Link to="/manage-bills/upcoming-overdue-bills/upcoming" className="icon-link">
        <div className="icon-button">
          <span className="icon">⏱️</span>
          <span className="label">Upcoming</span>
        </div>
      </Link>
    </>
  );
};

export default BillStatus;
