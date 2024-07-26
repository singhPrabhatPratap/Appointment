import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import AdminContext from '../Context/AdminContext';

export default function Messages() {
    let { IsAuthenticated } = useContext(AdminContext);
    let [message,setMessage]= useState([])
 if(!IsAuthenticated){
    return <Navigate to={'/login'}/>
 }
 async function getMessage(){
    let result = await axios.get("http://localhost:4000/api/v1/message/getmessage",{withCredentials:true})
setMessage(result.data.message)
 }
 useEffect(()=>{
    getMessage()
 },[])
//  console.log(message)
  return (
   <>
    <section className="px-2 py-10 md:px-0 bg-green-100">
      <div className="mx-auto max-w-4xl">
        {message.map((mes)=>(
            <div className="md:flex md:items-center md:justify-center bg-white md:space-x-14 mt-4 shadow-lg p-4">
            <div className="mt-10 md:mt-0">
              <blockquote>
                <p className="text-xl text-black">
                  {mes.message}
                </p>
              </blockquote>
              <p className="mt-7 text-lg font-semibold text-black">{`${mes.firstName} ${mes.middleName} ${mes.lastName}`}</p>
              <p className="mt-1 text-base text-gray-600">{mes.email}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
   </>
  )
}
