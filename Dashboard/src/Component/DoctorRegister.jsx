// http://localhost:4000/api/v1/user/doctor/Registered
import React, { useContext, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AdminContext from "../Context/AdminContext";

export default function DoctorRegister() {
    let { IsAuthenticated } = useContext(AdminContext);
    if(!IsAuthenticated){
        return <Navigate to={'/login'}/>
    }
  const depratmentArr = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "ENT",
  ];

  let navigation = useNavigate();
  let [firstName, setfirstName] = useState("");
  let [lastName, setlastName] = useState("");
  let [middleName, setmiddleName] = useState("");
  let [email, setemail] = useState("");
  let [phone, setphone] = useState("");
  let [password, setpassword] = useState("");
  let [gender, setgender] = useState("");
  let [dob, setdob] = useState("");
  let [doctorDepartment, setdoctorDepartment] = useState("");
  let [docAvatar, setdocAvatar] = useState("");
  let [docAvatarPreview, setdocAvatarPreview] = useState("");

  async function handleAvatar(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setdocAvatarPreview(reader.result);
      setdocAvatar(file);
    };
  }

  async function handleregister() {
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("dob", dob);
      formData.append("middleName", middleName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);

      await axios
        .post("http://localhost:4000/api/v1/user/doctor/Registered", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          navigation("/login");
        });
    } catch (error) {
      //   console.log(error)
      toast.error(error.response.data.message);
    }
  }
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 bg-green-100">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-green-700">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-green-700">
            Already have an account?{" "}
            <Link
              to="/login"
              title=""
              className="font-medium text-green-400 transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5 grid grid-cols-2 gap-5">
              <div className="mt-5">
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  First Name{" "}
                </label>
                <div className="mt-2">
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
                    Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  className="text-base font-medium text-green-700"
                  htmlFor=""
                >
                  Department
                </label>
                <div>
                  <select
                  className="w-full p-2"
                    value={doctorDepartment}
                    onChange={(e) => setdoctorDepartment(e.target.value)}
                  >
                    <option value="">Select Department</option>
                    {depratmentArr.map((depart) => (
                      <option value={depart}>{depart}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
            <img
              className="w-[200px]"
              src={
                docAvatarPreview
                  ? `${docAvatarPreview}`
                  : "https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Image.png"
              }
              alt=""
            />
            <input type="file" onChange={handleAvatar} />
          </div>
              <div className="col-start-1 col-end-3">
                <button
                  onClick={handleregister}
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-green-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <span className="mr-2 inline-block">
                <svg
                  className="h-6 w-6 text-rose-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </span>
              Sign up with Google
            </button>
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <span className="mr-2 inline-block">
                <svg
                  className="h-6 w-6 text-[#2563EB]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                </svg>
              </span>
              Sign up with Facebook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
