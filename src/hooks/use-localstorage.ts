import React from "react";

export const useLocalStorage = () => {
  const [localStorageAvailable, setLocalStorageAvailable] = React.useState(false);

  React.useEffect(() => {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      setLocalStorageAvailable(true);
    } catch (e) {
      setLocalStorageAvailable(false);
    }
  }, []);

  const getItem = (key: string): string | null => {
    if (localStorageAvailable) {
      return localStorage.getItem(key);
    }
    return null;
  };

  const setItem = (key: string, value: string) => {
    if (localStorageAvailable) {
      localStorage.setItem(key, value);
    }
  };

  const removeItem = (key: string) => {
    if (localStorageAvailable) {
      localStorage.removeItem(key);
    }
  };

  return { getItem, setItem, removeItem };
};