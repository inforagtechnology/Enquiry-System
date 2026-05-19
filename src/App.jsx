import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './component/RegistrationForm'
import EnquiryForm from './component/EnquiryForm'
import RegistrationSearch from './component/RegistrationSearch'
import RegistrationEdit from './component/RegistrationEdit'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdmissionForm } from './component/AdmissionForm'
import FormSelector from './component/FormSelector'
import Navbar from './component/Navbar'
import { Home } from './component/Home'
import { About } from './component/About'
import Signup from './component/Signup'
import AuthForm from './component/AuthForm'
import ForgotPassword from './component/ForgotPassword'
import ResetPassword from './component/ResetPassword'
import Dashboard from './component/Dashboard'
import Login from './component/Login'

function App() {
  // const [count, setCount] = useState(0)
  const [user, setUser] = useState(null);

  // const ProtectedRoute = ({ children }) => {
  //   const token = localStorage.getItem("token");
  //   return token ? children : <Navigate to="/login" />;
  // }
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/registration' element={<RegistrationForm />}></Route>
          <Route path='/editregistration/:id' element={<RegistrationEdit />}></Route>
          <Route path='/registrationSearch' element={<RegistrationSearch />}></Route>
          <Route path='/admission_form' element={<AdmissionForm />}></Route>
          <Route path='/enquiry_form' element={<EnquiryForm />}></Route>
          <Route path='/form_selector' element={<FormSelector />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/authform' element={<AuthForm />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          {/* <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
          </Route> */}

          {/* <Route path="*" element={<Navigate to="/login" />} >  </Route> */}
          


            {/* <Route path="/dashboard" element={<Dashboard  user={user} />} /> */}
            {/* <Route element={< />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
       <Route path='/login' element={<Login  setUser={setUser} />}></Route> */}

          </Routes>
          {/* <RegistrationForm/> */}
          {/* <RegistrationSearch/>
        <FormSelector/> */}
          {/* <RegistrationEdit/> */}
          {/* <AdmissionForm/> */}
          {/* <EnquiryForm/> */}
          {/* <Signup/> */}
          {/* <Dashboard/> */}
      </BrowserRouter>
    </>
  )
}

export default App
