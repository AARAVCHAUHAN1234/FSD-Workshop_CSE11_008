import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import StudentRegistration from './StudentRegistration';
import LoginPage from './loginPage';
import StudentDashboard from './studentDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<StudentRegistration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<StudentDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;