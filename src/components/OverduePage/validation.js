export const validateSubmitForm = (billName) => {
    if (billName.trim().length < 3) {
      return 'Bill name must be at least 3 characters long.';
    }
    return null;  // No errors
  };
