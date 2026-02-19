import React, { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage when app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
