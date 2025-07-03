import React, { createContext, useState, useContext, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user from sessionStorage if available
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData); // Set the user data
    sessionStorage.setItem("user", JSON.stringify(userData)); // Save user data to sessionStorage
  };

  const logout = () => {
    setUser(null); // Clear the user data
    sessionStorage.removeItem("user"); // Remove user data from sessionStorage
  };

  // Automatically log out when the browser tab is closed
  useEffect(() => {
    const handleTabClose = () => {
      logout();
    };
    window.addEventListener("beforeunload", handleTabClose);
    return () => { 
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};