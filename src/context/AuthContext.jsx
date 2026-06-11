import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cb-user')) || null; }
    catch { return null; }
  });

  const login = ({ name, email }) => {
    const userData = { name: name || email.split('@')[0], email };
    setUser(userData);
    localStorage.setItem('cb-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cb-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("useAuth returned undefined! Make sure AuthProvider is wrapping the component.");
    return { user: null, login: () => {}, logout: () => {}, isLoggedIn: false };
  }
  return context;
};
