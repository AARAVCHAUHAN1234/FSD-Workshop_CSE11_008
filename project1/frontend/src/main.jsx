import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StudentRegistration from './StudentRegistration.jsx'
import LoginPage from './loginPage.jsx'
import StudentDashboard from './studentDashboard.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
   
  </StrictMode>,
)
