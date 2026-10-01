import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
import {
  TeacherThemeProvider,
  useTheme as useTeacherTheme,
} from "./teacher/TeacherContext";

// Layout for every /teacher/* route — applies the teacher's theme context state
const TeacherLayout = () => {
  const { isDarkMode } = useTeacherTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? "bg-[#121212] text-white" : "bg-white text-gray-900"
      }`}
    >
      <Outlet />
    </div>
  );
};

// Layout for every /parent/* route — relies strictly on system dark/light mode via Tailwind's `dark:` strategy
const ParentLayout = () => {
  return (
    <div className="min-h-screen transition-colors duration-200 bg-white text-black dark:bg-[#000000] dark:text-white">
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          {/* Public Routes — pre-login */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnBoarding />} />
          <Route path="/role" element={<RoleSelect />} />

          {/* Teacher Routes — wrapped in TeacherThemeProvider + TeacherLayout */}
          <Route
            element={
              <TeacherThemeProvider>
                <TeacherLayout />
              </TeacherThemeProvider>
            }
          >
            <Route path="/teacher/signup" element={<Teacher.SignUp />} />
            <Route path="/teacher/login" element={<Teacher.Login />} />
            <Route path="/teacher/home" element={<Teacher.HomePage />} />
            <Route path="/teacher/report" element={<Teacher.Report />} />
            <Route path="/teacher/message" element={<Teacher.Message />} />
            <Route path="/teacher/calendar" element={<Teacher.Calendar />} />
            <Route path="/teacher/profile" element={<Teacher.Profile />} />
            <Route path="/teacher/verify" element={<Teacher.Verify />} />
          </Route>

          {/* Parent Routes — using ParentLayout with system-driven dark mode support */}
          <Route element={<ParentLayout />}>
            <Route path="/parent/signup" element={<Parent.SignUp />} />
            <Route path="/parent/login" element={<Parent.Login />} />
            <Route path="/parent/verify" element={<Parent.Verify />} />
            <Route path="/parent/home" element={<Parent.HomePage />} />
            <Route path="/parent/report" element={<Parent.Report />} />
            <Route path="/parent/message" element={<Parent.Message />} />
            <Route path="/parent/calendar" element={<Parent.Calendar />} />
            <Route path="/parent/profile" element={<Parent.Profile />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
