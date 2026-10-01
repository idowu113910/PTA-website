import { useState, useEffect } from "react";

const getSystemPrefersDark = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

/**
 * Reads the device's system color scheme directly, for pages that render
 * outside both ParentThemeProvider and TeacherThemeProvider (the public
 * routes: RoleSelect, Login, SignUp, Verify). Updates live if the system
 * setting changes while the page is open, and keeps the <html> "dark"
 * class in sync so the global Safari safe-area CSS in App.css stays
 * correct even when neither theme provider is mounted.
 */
export const useSystemTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(getSystemPrefersDark);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setIsDarkMode(e.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return isDarkMode;
};
