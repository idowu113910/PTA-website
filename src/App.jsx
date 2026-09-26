import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

// Public pages
import SplashScreen from "./pages/SplashScreen";
import OnBoarding from "./pages/OnBoarding";
import RoleSelect from "./pages/RoleSelect";

// Namespace imports for Role-based pages
import * as Teacher from "./teacher";
import * as Parent from "./parent";

// Context Providers
import { UserProvider } from "./teacher/UserContext";
import { ThemeProvider, useTheme } from "./ThemeContext";

// App Content wrapper to apply global theme styles
const AppContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? "bg-[#121212] text-white" : "bg-white text-gray-900"
      }`}
    >
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/role" element={<RoleSelect />} />

        {/* Teacher Routes */}
        <Route path="/teacher/signup" element={<Teacher.SignUp />} />
        <Route path="/teacher/login" element={<Teacher.Login />} />
        <Route path="/teacher/home" element={<Teacher.HomePage />} />
        <Route path="/teacher/report" element={<Teacher.Report />} />
        <Route path="/teacher/message" element={<Teacher.Message />} />
        <Route path="/teacher/calendar" element={<Teacher.Calendar />} />
        <Route path="/teacher/profile" element={<Teacher.Profile />} />

        {/* Parent Routes */}
        <Route path="/parent/signup" element={<Parent.SignUp />} />
        <Route path="/parent/login" element={<Parent.Login />} />
        <Route path="/parent/home" element={<Parent.HomePage />} />
        <Route path="/parent/report" element={<Parent.Report />} />
        <Route path="/parent/message" element={<Parent.Message />} />
        <Route path="/parent/calendar" element={<Parent.Calendar />} />
        <Route path="/parent/profile" element={<Parent.Profile />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
