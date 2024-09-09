import React, { useState, useContext, useEffect } from 'react';
import { BillsContext } from '../../context/BillsContext'; 
import { validateBillsOverviewForm } from './validation'; 
import { useNavigate, Link } from 'react-router-dom';
import './BillsOverview.css';  // Import custom CSS
export const getStatus = (dueDate) => {
    const today = new Date();
    const billDate = new Date(dueDate);
    if (billDate < today) {
      return 'Pending';
    }
    return 'Upcoming';
  };


const BillsOverview = () => {
  const { bills } = useContext(BillsContext); 
  const [category, setCategory] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [status, setStatus] = useState('Upcoming');
  const [filteredBills, setFilteredBills] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  
  const filterBills = () => {
    const fromDate = dateFrom ? new Date(dateFrom) : null;
    const toDate = dateTo ? new Date(dateTo) : null;

    const filtered = bills.filter((bill) => {
      const billDate = new Date(bill.dueDate);
      const isCategoryMatch = category === 'All' || bill.category === category;
      const isDateMatch = (!fromDate || billDate >= fromDate) && (!toDate || billDate <= toDate);
      const isStatusMatch = status === 'All' || getStatus(bill.dueDate) === status;

      return isCategoryMatch && isDateMatch && isStatusMatch;
    });

    setFilteredBills(filtered);
  };

  useEffect(() => {
    filterBills();
  }, [category, dateFrom, dateTo, status, bills]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const error = validateBillsOverviewForm(category, dateFrom, dateTo, status);
    if (error) {
      setErrorMessage(error);
      return;
    }

    filterBills();
  };

  return (
    <div className="bills-overview-page">
      <div className="home-icon">
        <Link to="/manage-bills">
          <div className="icon">🏠</div>
          <div className="label">Home</div>
        </Link>
      </div>
      <h1>Bills Overview</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Bill Category:</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Debt Payments">Debt Payments</option>
            <option value="House Rent">House Rent</option>
            <option value="Groceries">Groceries</option>
            <option value="Internet Charges">Internet Charges</option>
            <option value="Retirement Charges">Retirement Charges</option>
            <option value="Cell phone charges">Cell phone charges</option>
            <option value="None">None</option>
          </select>
        </div>

        <div>
          <label htmlFor="dateFrom">Bill Date From:</label>
          <input
            type="date"
            id="dateFrom"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="dateTo">Bill Date To:</label>
          <input
            type="date"
            id="dateTo"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="status">Bill Status:</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="submit-button-container">
    <button type="submit">Submit</button>
  </div>
      </form>

      <div className="bills-list">
        <h2>Filtered Bills</h2>
        {filteredBills.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Category</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((bill, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{bill.billName}</td>
                  <td>{bill.billCategory}</td>
                  <td>{bill.dueDate}</td>
                  <td>${bill.amount}</td>
                  <td>{getStatus(bill.dueDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bills found based on the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default BillsOverview;
