import React, { useState, useContext, useEffect } from 'react';
import './UpdateBillStatus.css';
import { BillsContext } from '../../context/BillsContext';
import { getStatus } from '../BillsOverview/BillsOverview.js';
import { validateSubmitForm, validateSnoozeForm } from './validation.js';

const UpdateBillStatus = () => {
  const { updateBillDueDate } = useContext(BillsContext);
  const { bills } = useContext(BillsContext);
  const [category, setCategory] = useState('All');
  const [billName, setBillName] = useState('');
  const [filteredBills, setFilteredBills] = useState([]);
  const [checkedStates, setCheckedStates] = useState(
    new Array(filteredBills.length).fill(false)
  );
  const [snoozeDate, setSnoozeDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [snoozeErrorMessage, setSnoozeErrorMessage] = useState('');

  useEffect(() => {
    setCheckedStates(new Array(filteredBills.length).fill(false));
  }, [filteredBills]);

  const handleCheckboxChange = (index) => {
    // Toggle the checkbox state for the specific row
    const updatedCheckedStates = checkedStates.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedStates(updatedCheckedStates);
  };

  const markAsPaid = (bill) => {
    bill.status = 'Paid';
    filterBills();
  };

  const handleSnooze = () => {
    if (snoozeDate === '') return;

    if (filteredBills.length === 0) {
      setSnoozeErrorMessage('No bill is selected');
      return;
    }

    const updatedBills = [];
    let validationError = null;
    let flag = false;

    for (const bill of bills) {
      if (checkedStates[filteredBills.findIndex(fBill => fBill.id === bill.id)]) {
        flag = true;
        validationError = validateSnoozeForm(snoozeDate, bill);
        if (validationError) {
          setSnoozeErrorMessage(validationError);
          return;
        }
        updatedBills.push({ ...bill, dueDate: snoozeDate });
      } else {
        updatedBills.push(bill);
      }
    }

    if (!flag) {
      setSnoozeErrorMessage('No bill is selected');
      return;
    }

    updateBillDueDate(updatedBills);
    setSnoozeErrorMessage('Bill Snoozed');
    filterBills();
  };

  const filterBills = () => {
    const filtered = bills.filter((bill) => {
      const isCategoryMatch = category === 'All' || bill.billCategory === category;
      const isStatusMatch = getStatus(bill, bill.dueDate) === 'Upcoming' || getStatus(bill, bill.dueDate) === 'Pending';
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

  const snoozeInputHandler = (e) => {
    setSnoozeDate(e.target.value);
    setSnoozeErrorMessage('');
  };

  const billNameHandler = (e) => {
    setBillName(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateForm();

    if (result.length > 0) return;

    const length = filterBills();
    if (length === 0) {
      setErrorMessage('No bill exists matching above details');
    }
  };

  return (
    <>
      <div className="filter">
        <form onSubmit={handleSubmit}>
          <div className="filter" style={{ marginBottom: '4px' }}>
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
            <label htmlFor="billName">Bill Name:</label>
            <input
              type="text"
              name="query"
              placeholder="Search..."
              className="search-input"
              onChange={billNameHandler}
              required
            />
            {errorMessage && <p>{errorMessage}</p>}
          </div>

          <div className="button-container">
            <button type="submit" className="button">Submit</button>
          </div>
        </form>

        <br />
      </div>

      <div className="ubs-bills-table">
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Bill Name</th>
              <th>Amount Overdue</th>
              <th>Due Date</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.length > 0 ? (
              filteredBills.map((bill, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedStates[index]}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td>{bill.billName}</td>
                  <td>{bill.amount}</td>
                  <td>{bill.dueDate}</td>
                  <td>{bill.billCategory}</td>
                  <td>
                    <button
                      className="action-button"
                      onClick={() => markAsPaid(bill)}
                      disabled={!checkedStates[index]}
                    >
                      Paid
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No bills found based on the selected criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="snooze-section">
          <label htmlFor="snoozeDate">Snooze Date:</label>
          <input
            type="date"
            id="snoozeDate"
            onChange={snoozeInputHandler}
            required
          />
          <button type="submit" onClick={handleSnooze}>Snooze</button>
          {snoozeErrorMessage && <p>{snoozeErrorMessage}</p>}
        </div>
      </form>
    </>
  );
};

export default UpdateBillStatus;
