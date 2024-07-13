import React from 'react'
import Sidebar from './Component/Sidebar'
import { Outlet } from 'react-router-dom'
import AdminContextProvider from './Context/AdminContextProvider.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <AdminContextProvider>
  <Sidebar/>
   <Outlet/>
   <ToastContainer position="top-center" />
    </AdminContextProvider>
  )
}
