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

  return (
    <BillsContext.Provider value={{ bills, addBill, updateReminderSettings }}>
      {children}
    </BillsContext.Provider>
  );
};
