"use client";
import { createContext, useState } from 'react';

export const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(true);

  const footerActive = (active) => {
    setIsActive(active);
  };

  return (
    <ClassContext.Provider value={{ isActive, footerActive }}>
      {children}
    </ClassContext.Provider>
  );
};
