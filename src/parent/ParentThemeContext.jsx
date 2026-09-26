import React, { createContext, useContext, useState, useEffect } from "react";

const ParentThemeContext = createContext();

export const ParentThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("parent-theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("parent-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("parent-theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ParentThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ParentThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ParentThemeContext);
