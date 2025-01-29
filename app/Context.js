"use client";
import { createContext, useState } from 'react';

export const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(true);
  const [username, setUsername] = useState('');

  const footerActive = (active) => {
    setIsActive(active);
  };

  return (
    <ClassContext.Provider value={{ 
      isActive, 
      footerActive,
      username, 
      setUsername
      }}>
      {children}
    </ClassContext.Provider>
  );
};
