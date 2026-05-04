import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [fullName, setFullName] = useState(
    localStorage.getItem("fullName") || "",
  );
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [schoolName, setSchoolName] = useState(
    localStorage.getItem("schoolName") || "",
  );
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber") || "",
  );
  const [studentCount, setStudentCount] = useState(
    localStorage.getItem("studentCount") || "",
  );
  const [grade, setGrade] = useState(localStorage.getItem("grade") || "");
  const [room, setRoom] = useState(localStorage.getItem("room") || "");
  const [teacherName, setTeacherName] = useState(
    localStorage.getItem("teacherName") || "",
  );
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || "",
  );

  function updateFullName(name) {
    setFullName(name);
    localStorage.setItem("fullName", name);
  }

  function updateEmail(newEmail) {
    setEmail(newEmail);
    localStorage.setItem("userEmail", newEmail);
  }

  function updateSchoolName(name) {
    setSchoolName(name);
    localStorage.setItem("schoolName", name);
  }

  function updatePhoneNumber(number) {
    setPhoneNumber(number);
    localStorage.setItem("phoneNumber", number);
  }

  function updateStudentCount(count) {
    setStudentCount(count);
    localStorage.setItem("studentCount", count);
  }

  function updateGrade(val) {
    setGrade(val);
    localStorage.setItem("grade", val);
  }

  function updateRoom(val) {
    setRoom(val);
    localStorage.setItem("room", val);
  }

  function updateTeacherName(val) {
    setTeacherName(val);
    localStorage.setItem("teacherName", val);
  }

  function updateProfileImage(imageUrl) {
    setProfileImage(imageUrl);
    localStorage.setItem("profileImage", imageUrl);
  }

  function saveOnboardingData({
    fullName,
    workEmail,
    schoolName,
    phoneNumber,
    studentCount,
  }) {
    updateFullName(fullName);
    updateEmail(workEmail);
    updateSchoolName(schoolName);
    updatePhoneNumber(phoneNumber);
    updateStudentCount(studentCount);
  }

  return (
    <UserContext.Provider
      value={{
        fullName,
        updateFullName,
        email,
        updateEmail,
        schoolName,
        updateSchoolName,
        phoneNumber,
        updatePhoneNumber,
        studentCount,
        updateStudentCount,
        grade,
        updateGrade,
        room,
        updateRoom,
        teacherName,
        updateTeacherName,
        profileImage,
        updateProfileImage,
        saveOnboardingData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
