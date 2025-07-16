"use client";
import { createContext, useState, useEffect } from 'react';

export const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(true);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado de carga

  const footerActive = (active) => {
    setIsActive(active);
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("userData");
  
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData)); // Carga datos del usuario desde localStorage
      setIsLoading(false);
    } else if (token) {
      fetch("http://192.168.1.240:5000/api/users/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUserData(data.user);
          localStorage.setItem('userData', JSON.stringify(data.user)); // Guarda en localStorage
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
      })
      .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);



  return (
    <ClassContext.Provider value={{ 
      isActive, 
      footerActive,
      userData, 
      setUserData,
      isLoading
      }}>
      {children}
    </ClassContext.Provider>
  );
};
