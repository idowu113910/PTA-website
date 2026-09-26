import React, { createContext, useContext, useState, useEffect } from "react";

const TeacherThemeContext = createContext();

export const TeacherThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("teacher-theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("teacher-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("teacher-theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <TeacherThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </TeacherThemeContext.Provider>
  );
};

export const useTheme = () => useContext(TeacherThemeContext);
