export const generateId = () => {
    return Math.random().toString(36).substring(2, 6); // Generates a 4-character random string
  };