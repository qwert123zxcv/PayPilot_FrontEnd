import React, { useState, useContext } from 'react';
import { BillsContext } from '../../context/BillsContext';
import { useNavigate } from 'react-router-dom';
import './AddNewBill.css'; // Custom CSS for styling

const AddNewBill = () => {
  const { addBill } = useContext(BillsContext);  // Use the context
  const [billName, setBillName] = useState('');
  const [billCategory, setBillCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [amount, setAmount] = useState('');
  const [reminderFrequency, setReminderFrequency] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [notes, setNotes] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setAttachment(file);
    } else {
      alert('Only PDF files are allowed.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBill = {
      billName,
      billCategory,
      dueDate,
      amount,
      reminderFrequency,
      attachment,
      notes,
      isRecurring,
    };

    addBill(newBill);  // Add the new bill to the context
    setSuccessMessage('Bill has been successfully saved!');
    
    // Clear the form or navigate to another page if necessary
    navigate('/manage-bills/bills-overview');  // Navigate to BillsOverview
  };

  return (
    <div className="add-new-bill-page">
      <h1>Add New Bill</h1>
      <form onSubmit={handleSubmit}>
        {/* Bill Form Fields */}
        <div>
          <label htmlFor="billName">Bill Name:</label>
          <input
            type="text"
            id="billName"
            value={billName}
            onChange={(e) => setBillName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="billCategory">Bill Category:</label>
          <select
            id="billCategory"
            value={billCategory}
            onChange={(e) => setBillCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Debt Payments">Debt Payments</option>
            <option value="House Rent">House Rent</option>
            <option value="Groceries">Groceries</option>
            <option value="Internet Charges">Internet Charges</option>
            <option value="Retirement Charges">Retirement Charges</option>
            <option value="Cell phone charges">Cell phone charges</option>
          </select>
        </div>

        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="reminderFrequency">Reminder Frequency:</label>
          <select
            id="reminderFrequency"
            value={reminderFrequency}
            onChange={(e) => setReminderFrequency(e.target.value)}
            required
          >
            <option value="">Select frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Annually">Annually</option>
          </select>
        </div>

        <div>
          <label htmlFor="attachment">Attachment (PDF only):</label>
          <input
            type="file"
            id="attachment"
            onChange={handleFileChange}
            accept="application/pdf"
          />
        </div>

        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="isRecurring">Recurring Bill:</label>
          <input
            type="checkbox"
            id="isRecurring"
            checked={isRecurring}
            onChange={() => setIsRecurring(!isRecurring)}
          />
        </div>

        <button type="submit">Save Bill</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default AddNewBill;
