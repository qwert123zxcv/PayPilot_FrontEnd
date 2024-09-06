export const validateForm = (billName, billCategory, amount, dueDate, reminderFrequency) => {
    if (billName.trim().length < 3) {
      return 'Bill name must be at least 3 characters long.';
    }
    if (!billCategory) {
      return 'Please select a bill category.';
    }
    if (amount <= 0 || isNaN(amount)) {
      return 'Amount must be a positive number.';
    }
    if (new Date(dueDate) <= new Date()) {
      return 'Due date must be a future date.';
    }
    if (!reminderFrequency) {
      return 'Please select a reminder frequency.';
    }
    return null;  // No errors
  };
