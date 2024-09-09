import React, { useState, useContext } from 'react';
import { BillsContext } from '../../context/BillsContext';
import { useNavigate } from 'react-router-dom';

const UpdateOrDeleteBill = () => {
  const { bills, updateBill, deleteBill } = useContext(BillsContext); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBill, setSelectedBill] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    billName: '',
    dueDate: '',
    amount: '',
    category: '',
  });
  const navigate = useNavigate();

  const handleSearch = () => {
    const bill = bills.find(bill => bill.billName.toLowerCase() === searchTerm.toLowerCase());
    if (bill) {
      setSelectedBill(bill);
      setUpdatedDetails({
        billName: bill.billName,
        dueDate: bill.dueDate,
        amount: bill.amount,
        category: bill.billCategory,
      });
    } else {
      setSelectedBill(null);
      alert('Bill not found.');
    }
  };

  const handleUpdate = () => {
    if (selectedBill) {
      updateBill(selectedBill.billId, updatedDetails);
      alert('Bill updated successfully.');
      navigate('/manage-bills');
    }
  };

  const handleDelete = () => {
    if (selectedBill) {
      deleteBill(selectedBill.billId);
      alert('Bill deleted successfully.');
      navigate('/manage-bills');
    }
  };

  return (
    <div className="update-delete-bill-page">
      <h1>Update or Delete Bill</h1>
      
      <div>
        <input
          type="text"
          placeholder="Enter bill name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {selectedBill && (
        <div>
          <h2>Bill Details</h2>
          <label>
            Bill Name:
            <input
              type="text"
              value={updatedDetails.billName}
              onChange={(e) => setUpdatedDetails({ ...updatedDetails, billName: e.target.value })}
            />
          </label>
          <label>
            Due Date:
            <input
              type="date"
              value={updatedDetails.dueDate}
              onChange={(e) => setUpdatedDetails({ ...updatedDetails, dueDate: e.target.value })}
            />
          </label>
          <label>
            Amount:
            <input
              type="number"
              value={updatedDetails.amount}
              onChange={(e) => setUpdatedDetails({ ...updatedDetails, amount: e.target.value })}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              value={updatedDetails.category}
              onChange={(e) => setUpdatedDetails({ ...updatedDetails, category: e.target.value })}
            />
          </label>

          <div className="action-buttons">
            <button onClick={handleUpdate}>Update Bill</button>
            <button onClick={handleDelete}>Delete Bill</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateOrDeleteBill;
