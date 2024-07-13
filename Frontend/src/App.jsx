import React from 'react'
import UserContextProvider from './Context/UserContextProvider'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <UserContextProvider>
           <Navbar/>
           <Outlet/>
           <ToastContainer position="top-center" />
    </UserContextProvider>
  )
}
