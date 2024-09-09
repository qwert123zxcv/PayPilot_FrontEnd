import React, { useState, useContext } from 'react';
import './OverduePage.css'
import { BillsContext } from '../../context/BillsContext'; // Adjust the path as necessary
import { getStatus } from '../BillsOverview/BillsOverview.js';
import { validateSubmitForm } from './validation.js';

const OverduePage = () => {

  const { bills } = useContext(BillsContext); // Get bills from the context
  const [filteredBills, setFilteredBills] = useState([]);
  const [category, setCategory] = useState('All');
  const [billName, setBillName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const filterBills = () => {

    const filtered = bills.filter((bill) => {
      const isCategoryMatch = category === 'All' || bill.billCategory === category;
      const isStatusMatch = getStatus(bill, bill.dueDate) === 'Pending';
      const isBillNameMatch = bill.billName === billName;
      return isCategoryMatch && isStatusMatch && isBillNameMatch;
    });

    setFilteredBills(filtered);
    return filtered.length;
  };

  const validateForm = () => {
    const formSubmitMessage = validateSubmitForm(billName);
    if (formSubmitMessage !== null) {
      setErrorMessage(formSubmitMessage);
      return formSubmitMessage;
    }
    setErrorMessage('');
    return '';
  };

  const billNameHandler = (e) => {
    setBillName(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateForm();
    if (result.length > 0) return;
    const length = filterBills(); // Trigger filtering on form submission
    if (length === 0) {
      setErrorMessage('No bill exists matching above details');
    }
  };

  return (
      <>
        <h1>Overdue Bills</h1>
        <form onSubmit={handleSubmit}>
          <div className="filter" style={{marginBottom: '4px'}}>
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
            <label htmlFor='billName'>Bill Name:</label>
            <input type="text" name="query" placeholder="Search..." class="search-input" onChange={billNameHandler} required/>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
  
          {/* Centered button */}
          <div className="button-container">
            <button type="submit" className="button">Submit</button>
          </div>
        </form>
  
        <div className="overdue-bills-table">
          <table>
            <thead>
              <tr>
                <th>Bill Name</th>
                <th>Amount Overdue</th>
                {/*<th>Total Amount</th>*/}
                <th>Due Date</th>
                <th>Category</th>
                {/*<th>Due In</th>*/}
                {/*<th>Payment Status</th>*/}
              </tr>
            </thead>
            <tbody>
              {filteredBills.length > 0 ? (
                filteredBills.map((bill, index) => (
                  <tr key={index}>
                    <td>{bill.billName}</td>
                    <td>{bill.amount}</td>
                    <td>{bill.dueDate}</td>
                    <td>{bill.billCategory}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{textAlign: 'center'}}>No bills found based on the selected criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
};

export default OverduePage;
