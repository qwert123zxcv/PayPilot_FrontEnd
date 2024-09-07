import React from 'react';
import './OverduePage.css'

const OverduePage = () => {
  return (
    <>
      <h1>Overdue Bills</h1>
      <div class='filter'>
        <label htmlFor="category">Bill Category:</label>
            <select id="category">
              <option value="All">All</option>
              <option value="Debt Payments">Debt Payments</option>
              <option value="House Rent">House Rent</option>
              <option value="Groceries">Groceries</option>
              <option value="Internet Charges">Internet Charges</option>
              <option value="Retirement Charges">Retirement Charges</option>
              <option value="Cell phone charges">Cell phone charges</option>
            </select>

        <br/>
        
        <label htmlFor='billName'>Bill Name:</label>
          <input type="text" name="query" placeholder="Search..." class="search-input"/>
      </div>

      <div className="overdue-bills-table">
        <table>
          <thead>
            <tr>
              <th>Bill Name</th>
              <th>Amount Overdue</th>
              <th>Total Amount</th>
              <th>Due Date</th>
              <th>Overdue By</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            
              
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OverduePage;
