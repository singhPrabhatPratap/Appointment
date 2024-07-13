import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './Component/Login.jsx'
import Welcome from './Component/Welcome.jsx'
import Appointment from './Component/Appointment.jsx'
import Messages from './Component/Messages.jsx'
import SeeDoctor from './Component/SeeDoctor.jsx'
import AdminSignup from './Component/AdminSignup.jsx'
import DoctorRegister from './Component/DoctorRegister.jsx'
 
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>} >
    <Route path='' element={<Welcome/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/appointment' element={<Appointment/>}/>
    <Route path='/message' element={<Messages/>}/>
    <Route path='/seedoctors' element={<SeeDoctor/>}/>
    <Route path='/adminregister' element={<AdminSignup/>}/>
    <Route path='/adddoctor' element={<DoctorRegister/>}/>

  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
