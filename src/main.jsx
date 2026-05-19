import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import RegistrationForm from './component/RegistrationForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <RegistrationForm/> */}
    {/* <RegistrationSearch/> */}
  </StrictMode>,
)
