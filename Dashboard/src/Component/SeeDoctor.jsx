import React, { useContext, useEffect, useState } from 'react'
import AdminContext from '../Context/AdminContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function SeeDoctor() {
    let { IsAuthenticated } = useContext(AdminContext);
    if(!IsAuthenticated){
        return <Navigate to={'/login'}/>
    }
    let [doctors,setDoctors]=useState([])
    async function getDoctors(){
     let result=   await axios.get('http://localhost:4000/api/v1/user/doctors',{withCredentials:true})
     setDoctors(result.data.doctors)
    }
    useEffect(()=>{
        getDoctors()
    },[])
    // console.log(doctors)
  return (
    <div className='flex flex-wrap gap-4 p-4'>
    {doctors.map((doc)=>(
          <div className="w-[250px] rounded-md border">
          <img
            src={doc.docAvatar.url}
            alt="Laptop"
            className="h-[200px] w-full rounded-md object-cover"
          />
          <div className="p-4">
            <h1 className="text-lg font-semibold">{`${doc.firstName} ${doc.middleName} ${doc.lastName}`}</h1>
            <p>{doc.email}</p>
            <h1>{doc.doctorDepartment}</h1>
            <h1>{doc.gender}</h1>
            <button
              type="button"
              className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Remove
            </button>
          </div>
        </div>
    ))}
    </div>
  )
}
