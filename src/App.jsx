import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import OnBoarding from "./pages/OnBoarding";
import RoleSelect from "./pages/RoleSelect";
import Introduction from "./teacher/Introduction";
import Intro from "./parent/Intro";
import HomePaget from "./teacher/HomePaget";
import Report from "./teacher/Report";
import Message from "./teacher/Message";
import Calendar from "./teacher/Calendar";
import Profile from "./teacher/Profile";
import { UserProvider } from "./teacher/UserContext";
import HomePage from "./parent/HomePage";
import Reportt from "./parent/Reportt";
import Messagee from "./parent/Messagee";
import Calendarr from "./parent/Calendarr";
import Profilee from "./parent/Profilee";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/onboarding" element={<OnBoarding />} />
            <Route path="/role" element={<RoleSelect />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/home" element={<HomePaget />} />
            <Route path="/homee" element={<HomePage />} />
            <Route path="/report" element={<Report />} />
            <Route path="/reportt" element={<Reportt />} />
            <Route path="/message" element={<Message />} />
            <Route path="/messagee" element={<Messagee />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/calendarr" element={<Calendarr />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profilee" element={<Profilee />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
