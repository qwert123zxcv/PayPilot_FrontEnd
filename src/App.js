import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import BillsOverview from './components/BillsOverview/BillsOverview';
import ManageBillsPage from './components/ManageBillsPage/ManageBillsPage';
import AddNewBill from './components/AddNewBill/AddNewBill';
import ReminderSettings from './components/ReminderSettings/ReminderSettings';
import { BillsProvider } from './context/BillsContext';  // Import BillsProvider


function App() {
  return (
    <BillsProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/manage-bills" element={<ManageBillsPage />} />
        <Route path="/manage-bills/bills-overview" element={<BillsOverview />} />
        <Route path="/manage-bills/add-new-bill" element={<AddNewBill />} />
        <Route path="/manage-bills/reminder-settings" element={<ReminderSettings />} />
        {/* Add routes for other pages such as Schedule Payments and Track Payments */}
      </Routes>
    </Router>
    </BillsProvider>
  );
}

export default App;


