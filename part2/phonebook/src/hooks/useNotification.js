import { useState } from 'react';

export const useNotification = (duration = 5000) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, duration);
  };

  return { notification, showNotification };
};
