import React, { useState, useContext, useEffect } from 'react';
import { BillsContext } from '../../context/BillsContext'; // Adjust the path as necessary

const BillsOverview = () => {
  const { bills } = useContext(BillsContext); // Get bills from the context
  const [category, setCategory] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [status, setStatus] = useState('Upcoming');
  const [filteredBills, setFilteredBills] = useState([]);

  // Utility function to get the status of a bill
  const getStatus = (dueDate) => {
    const today = new Date();
    const billDate = new Date(dueDate);
    if (billDate < today) {
      return 'Pending';
    }
    return 'Upcoming';
  };

  // Function to filter bills based on the selected criteria
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
    filterBills(); // Call the function to filter bills when dependencies change
  }, [category, dateFrom, dateTo, status, bills]); // Dependencies array includes the variables that, when changed, should trigger the effect
 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    filterBills(); // Trigger filtering on form submission
  };

  return (
    <div className="bills-overview-page">
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

        <button type="submit">Submit</button>
      </form>

      <div className="bills-list">
        <h2>Filtered Bills</h2>
        {filteredBills.length > 0 ? (
          <ul>
            {filteredBills.map((bill, index) => (
              <li key={index}>
                <strong>{bill.name}</strong> - {bill.category} - Due: {bill.dueDate} - Amount: ${bill.amount} - Status: {getStatus(bill.dueDate)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No bills found based on the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default BillsOverview;

