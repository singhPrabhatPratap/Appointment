import React, { useState } from 'react'
import AdminContext from './AdminContext'

export default function AdminContextProvider({children}) {
  let [IsAuthenticated,setIsAuthenticated]=useState(false)

  return (
    <AdminContext.Provider value ={{IsAuthenticated,setIsAuthenticated}}>
    {children}
    </AdminContext.Provider>
  )
}
