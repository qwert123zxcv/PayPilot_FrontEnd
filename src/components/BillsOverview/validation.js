export const validateBillsOverviewForm = (category, dateFrom, dateTo, status) => {
    const validCategories = [
      'All', 'Debt Payments', 'House Rent', 'Groceries', 'Internet Charges', 
      'Retirement Charges', 'Cell phone charges'
    ];
    const validStatuses = ['All', 'Upcoming', 'Pending', 'Paid'];
  
    // Category Validation
    if (!validCategories.includes(category)) {
      return 'Please select a valid bill category.';
    }
  
    // Date Validation
    if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
      return '"Bill Date From" cannot be later than "Bill Date To".';
    }
  
    // Status Validation
    if (!validStatuses.includes(status)) {
      return 'Please select a valid bill status.';
    }
  
    return null; // No validation errors
  };
