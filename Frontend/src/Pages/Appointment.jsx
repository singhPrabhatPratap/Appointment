import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../Context/UserContext";

export default function Appointment() {
  let { isAuthenticated,setAutenticated } = useContext(UserContext);
  let navigation = useNavigate();
  let [firstName, setfirstName] = useState("");
  let [lastName, setlastName] = useState("");
  let [middleName, setmiddleName] = useState("");
  let [email, setemail] = useState("");
  let [phone, setphone] = useState("");
  let [gender, setgender] = useState("");
  let [dob, setdob] = useState("");
  let [appointment_date, setappointment_date] = useState("");
  let [department, setdepartment] = useState("");
  let [doctor_firstName, setdoctor_firstName] = useState("");
  let [doctor_lastName, setdoctor_lastName] = useState("");
  let [hasvisited, sethasvisited] = useState(false);
  let [address, setaddress] = useState("");

  const depratmentArr = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "ENT",
  ];
  let [doctor, setdoctor] = useState([]);

  if(!isAuthenticated){
    return <Navigate to={'/login'}/>
  }
  async function fetchDoctor() {
   let doctors = await axios.get("http://localhost:4000/api/v1/user/doctors", {
    withCredentials: true,
  });
  setdoctor(doctors.data.doctors);
  setAutenticated(true)
  }
  useEffect(() => {
    fetchDoctor();
  }, []);

  async function handleappointment(e) {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasvisited);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/Appointment/appointment",
        {
          firstName,
          lastName,
          middleName,
          email,
          phone,
          dob,
          gender,
          appointment_date,
          department,
          doctor_firstName,
          doctor_lastName,
          hasvisited: hasVisitedBool,
          address,
        },
        { withCredentials: true, headers: { Content_Type: "application/json" } }
      );
      toast.success(data.message);
      navigation("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="flex items-center justify-center bg-green-100 w-full">
      <div className="w-full">
        <form action="#" method="POST" className="mt-8">
          <div className="space-y-5 grid grid-cols-2 gap-6 w-full p-10">
            <div>
              <label
                htmlFor="name"
                className="text-base font-medium text-gray-900"
              >
                {" "}
                First Name{" "}
              </label>
              <div className="mt-6">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Full Name"
                  id="name"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="text-base font-medium text-gray-900"
              >
                {" "}
                Last Name{" "}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Full Name"
                  id="name"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="text-base font-medium text-gray-900"
              >
                {" "}
                Middle Name{" "}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Full Name"
                  id="name"
                  value={middleName}
                  onChange={(e) => setmiddleName(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="text-base font-medium text-gray-900"
              >
                {" "}
                Gender{" "}
              </label>
              <div className="mt-2">
                <select
                className="w-full p-2"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="text-base font-medium text-gray-900"
              >
                {" "}
                Phone{" "}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="number"
                  placeholder="Full Name"
                  id="name"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                ></input>
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="text-base font-medium text-gray-900"
              >
                {" "}
                DOB{" "}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="Date"
                  placeholder="Full Name"
                  id="name"
                  value={dob}
                  onChange={(e) => setdob(e.target.value)}
                ></input>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-900"
              >
                {" "}
                Email address{" "}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Appointment - Date{" "}
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  placeholder="Password"
                  id="password"
                  value={appointment_date}
                  onChange={(e) => setappointment_date(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Department{" "}
                </label>
              </div>
              <div className="mt-2">
                <select
                 className="w-full p-2"
                  value={department}
                  onChange={(e) => setdepartment(e.target.value)}
                >
                  <option value="">Select Department</option>
                  {depratmentArr.map((dep) => (
                    <option value={dep}>{dep}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Appointment - Date{" "}
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  placeholder="Password"
                  id="password"
                  value={appointment_date}
                  onChange={(e) => setappointment_date(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Doctor- Name{" "}
                </label>
              </div>
              <div className="mt-2">
                <select
                 className="w-full p-2"
                  value={`${doctor_firstName} ${doctor_lastName}`}
                  onChange={(e) => {
                    const [doctor_firstName, doctor_lastName] =
                      e.target.value.split(" ");
                    setdoctor_firstName(doctor_firstName);
                    setdoctor_lastName(doctor_lastName);
                  }}
                  disabled={!department}
                >
                  <option value="">select Doctor</option>
                  {doctor
                    .filter((doct) => doct.doctorDepartment === department)
                    .map((doc) => (
                      <option value={`${doc.firstName} ${doc.lastName}`}>
                        {`${doc.firstName} ${doc.lastName}`}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <p style={{ margintop: 0 }}>Have you visited before
            <input
              type="checkbox"
              checked={hasvisited}
              onChange={(e) => sethasvisited(e.target.checked)}
            /></p>

            <textarea
              className="border col-start-1 col-end-3 p-3"
              rows={10}
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              placeholder="Enter Your Address..."
            ></textarea>

            
           
            <div className="col-start-1 col-end-3">
              <button
                onClick={handleappointment}
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md bg-green-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              >
                Fix Appointment <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
