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
  ParentThemeProvider,
  useTheme as useParentTheme,
} from "./parent/ParentThemeContext";
import {
  TeacherThemeProvider,
  useTheme as useTeacherTheme,
} from "./teacher/TeacherContext";

// Layout for every /teacher/* route — applies the teacher's own dark-mode background
// and renders whichever teacher page matched, via <Outlet />
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

// Layout for every /parent/* route — applies the parent's own dark-mode background
// and renders whichever parent page matched, via <Outlet />
const ParentLayout = () => {
  const { isDarkMode } = useParentTheme();

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

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          {/* Public Routes — pre-login, not tied to either role's theme */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnBoarding />} />
          <Route path="/role" element={<RoleSelect />} />

          {/* Teacher Routes — all wrapped in TeacherThemeProvider + TeacherLayout */}
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
          </Route>

          {/* Parent Routes — all wrapped in ParentThemeProvider + ParentLayout */}
          <Route
            element={
              <ParentThemeProvider>
                <ParentLayout />
              </ParentThemeProvider>
            }
          >
            <Route path="/parent/signup" element={<Parent.SignUp />} />
            <Route path="/parent/login" element={<Parent.Login />} />
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
