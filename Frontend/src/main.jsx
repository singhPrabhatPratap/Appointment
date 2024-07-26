import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import { Login } from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
// import About from "./Pages/About.jsx"; 
import Appointment from "./Pages/Appointment.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Userregister" element={<Signup />} />
      {/* <Route path="/about" element={<About />} /> */}
      <Route path="/appointment" element={<Appointment/>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
