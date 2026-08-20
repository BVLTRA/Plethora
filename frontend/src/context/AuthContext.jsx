import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('plethora_user');
      if (savedUser) {
        console.log("[Context] Found saved session:", JSON.parse(savedUser));
        return JSON.parse(savedUser);
      }
    } catch (error) {
      console.error("[Context] Failed to parse local storage:", error);
    }
    return null;
  });

  const login = (userData) => {
    console.log("[Context] Login triggered with data:", userData);
    setUser(userData);
    if (userData) {
      localStorage.setItem('plethora_user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    console.log("[Context] Logout triggered. Erasing session.");
    setUser(null);
    localStorage.removeItem('plethora_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};