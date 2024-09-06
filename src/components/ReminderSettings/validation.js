export const validateReminderSettings = (selectedCategory, reminderFrequency, startingDate, customMessage) => {
    const today = new Date().toISOString().split('T')[0];
  
    
  
    if (!startingDate || startingDate < today) {
      return 'Please choose a valid starting date in the future.';
    }
  
    if (customMessage.length === 0) {
      return 'Custom message cannot be empty.';
    }
  
    if (customMessage.length > 200) {
      return 'Custom message should not exceed 200 characters.';
    }
  
    if (!reminderFrequency) {
      return 'Please select a reminder frequency.';
    }
  
    return null;  // No validation errors
  };
