// validation.js
export const validateSubmitForm = (billName) => {
    if (billName.trim().length < 3) {
      return 'Bill name must be at least 3 characters long.';
    }
    return null;  // No errors
  };

  export const validateSnoozeForm = (snoozeDate, bill) => {
  const snoozeDateObject = new Date(snoozeDate);
  const billDueDateObject = new Date(bill.dueDate);

  // Convert both dates to the same format (e.g., YYYY-MM-DD) for comparison
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedSnoozeDate = formatDate(snoozeDateObject);
  const formattedBillDueDate = formatDate(billDueDateObject);

  // Convert formatted strings back to Date objects for comparison
  const snoozeDateForComparison = new Date(formattedSnoozeDate);
  const billDueDateForComparison = new Date(formattedBillDueDate);

  if (snoozeDateForComparison < billDueDateForComparison) {
    return 'Due date must be a future date.';
  }
  return null;
};

  // export const validateSnoozeForm = (snoozeDate, bill) => {
  //   console.log(new Date(snoozeDate));
  //   console.log(bill.dueDate);
  //   if (new Date(snoozeDate) < bill.dueDate) {
  //     console.log(new Date(snoozeDate));
  //     console.log(bill.dueDate);
  //     return 'Due date must be a future date.';
  //   }
  //   return null;
  // }
  
