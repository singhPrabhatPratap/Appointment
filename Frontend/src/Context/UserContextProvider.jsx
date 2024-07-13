import React, { useState } from 'react'
import UserContext from './UserContext'

export default function UserContextProvider({children}) {
let [isAuthenticated,setAutenticated]=useState(false)
  return (
    <UserContext.Provider value={{isAuthenticated,setAutenticated}}>
{children}
    </UserContext.Provider>
  )
}
