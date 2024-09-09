import React, { createContext, useState } from 'react';

export const BillsContext = createContext();

export const BillsProvider = ({ children }) => {
  const [bills, setBills] = useState([]);

  // Function to add a new bill
  const addBill = (newBill) => {
    setBills((prevBills) => [...prevBills, newBill]);
  };

  // Function to update reminder settings for a specific bill
  const updateReminderSettings = (billId, updatedSettings) => {
    setBills((prevBills) =>
      prevBills.map((bill) =>
        bill.id === billId ? { ...bill, reminderSettings: updatedSettings } : bill
      )
    );
  };
  const updateBillDueDate = (updatedBills) => {
    // setBills((prevBills) => [...prevBills, updatedBills]);
    setBills(updatedBills);
  };
 // Function to delete a bill by its ID
 const deleteBill = (billId) => {
  setBills((prevBills) => prevBills.filter((bill) => bill.billId !== billId));
};

// Function to update a bill (you may have already implemented this)
const updateBill = (billId, updatedDetails) => {
  setBills((prevBills) =>
    prevBills.map((bill) =>
      bill.billId === billId ? { ...bill, ...updatedDetails } : bill
    )
  );
};

  return (
    <BillsContext.Provider value={{ bills, addBill, updateReminderSettings, updateBillDueDate, deleteBill, updateBill }}>
      {children}
    </BillsContext.Provider>
  );
};
