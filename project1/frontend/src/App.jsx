
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./homePage";
import StudentRegistration from "./StudentRegistration";
import LoginPage from "./loginPage";
import StudentDashboard from "./studentDashboard";
import StudentList from "./StudentList";
import EditStudent from "./EditStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<StudentRegistration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/students" element={<StudentList />} />
        <Route
          path="/edit-student/:studentId"
          element={<EditStudent />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;