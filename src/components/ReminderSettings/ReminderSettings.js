import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { BillsContext } from '../../context/BillsContext';

const ReminderSettings = () => {
  const { bills } = useContext(BillsContext);
  
  const [searchTerm, setSearchTerm] = useState(''); // For bill name search
  const [reminderFrequency, setReminderFrequency] = useState('Daily');
  const [startingDate, setStartingDate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [notificationPreference, setNotificationPreference] = useState('Mail');
  const [isRecurring, setIsRecurring] = useState(false);
  const [filteredBills, setFilteredBills] = useState([]);

  // Fetching all bills initially
  useEffect(() => {
    setFilteredBills(bills.filter(bill =>
      bill.name && bill.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [bills, searchTerm]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reminderDetails = {
      reminderFrequency,
      startingDate,
      customMessage,
      notificationPreference,
      isRecurring,
    };

    try {
      await axios.post('http://localhost:8080/reminder-settings', reminderDetails);
      alert('Reminder settings updated successfully!');
    } catch (error) {
      console.error('There was an error updating the reminder settings!', error);
    }
  };

  return (
    <div>
      <h2>Reminder Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="search">Search Bill by Name:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Enter bill name"
          />
        </div>

        {/* This part will dynamically display bills filtered by category or search term */}
        <div>
          <h3>Matching Bills:</h3>
          <ul>
            {filteredBills.map((bill) => (
              <li key={bill.id}>
                {bill.name} - {bill.category}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label htmlFor="frequency">Reminder Frequency:</label>
          <select
            id="frequency"
            value={reminderFrequency}
            onChange={(e) => setReminderFrequency(e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Biweekly">Biweekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label htmlFor="startingDate">Starting Date:</label>
          <input
            type="date"
            id="startingDate"
            value={startingDate}
            onChange={(e) => setStartingDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="message">Custom Message:</label>
          <textarea
            id="message"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="notificationPreference">Notification Preference:</label>
          <select
            id="notificationPreference"
            value={notificationPreference}
            onChange={(e) => setNotificationPreference(e.target.value)}
          >
            <option value="Mail">Mail</option>
            <option value="Contact">Contact</option>
          </select>
        </div>

        <div>
          <label htmlFor="isRecurring">Recurring Bill:</label>
          <input
            type="checkbox"
            id="isRecurring"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
          />
        </div>

        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default ReminderSettings;
