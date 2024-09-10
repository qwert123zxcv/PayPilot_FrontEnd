import React, { useState, useContext } from 'react';
import axios from 'axios';
import { BillsContext } from '../../context/BillsContext';
import './UpdateOrDeleteBill.css';
import { useNavigate } from 'react-router-dom';

const UpdateOrDeleteBill = () => {
  const { bills } = useContext(BillsContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBill, setSelectedBill] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    billName: '',
    dueDate: '',
    amount: '',
    billCategory: '', 
  });
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/bills/search?billName=${searchTerm}`);
      const bill = response.data;
      if (bill) {
        setSelectedBill(bill);
        setUpdatedDetails({
          billName: bill.billName || '',
          dueDate: bill.dueDate || '',
          amount: bill.amount || '',
          billCategory: bill.billCategory || '', 
        });
      } else {
        setSelectedBill(null);
        alert('Bill not found.');
      }
    } catch (error) {
      console.error('Error fetching bill:', error);
      alert('Error fetching bill. Please try again.');
    }
  };

  const handleUpdate = async () => {
    if (!selectedBill) {
      alert("No bill selected to update.");
      return;
    }

    try {
      console.log("Updating with details:", updatedDetails); // Debugging
      const response = await axios.put(`http://localhost:8080/bills/${selectedBill.id}`, updatedDetails);
      if (response.status === 200) {
        alert("Bill updated successfully.");
        navigate("/manage-bills");
      } else {
        alert("Failed to update the bill.");
      }
    } catch (error) {
      console.error("An error occurred while updating the bill:", error);
      alert("Failed to update the bill. Please check the console for more details.");
    }
  };

  const handleDelete = async () => {
    if (!selectedBill) {
      alert("No bill selected to delete.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/bills/${selectedBill.id}`);
      alert("Bill deleted successfully.");
      navigate("/manage-bills");
    } catch (error) {
      console.error("An error occurred while deleting the bill:", error);
      alert("Failed to delete the bill.");
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
              value={updatedDetails.billCategory} 
              onChange={(e) => setUpdatedDetails({ ...updatedDetails, billCategory: e.target.value })} 
            />
          </label>

          <div className="action-buttons">
            <button className="update-button" onClick={handleUpdate}>Update Bill</button>
            <button className="delete-button" onClick={handleDelete}>Delete Bill</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateOrDeleteBill;
