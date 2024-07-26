import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import images from "./pngegg.png"

export default function Home() {
  let [firstName, setfirstName] = useState("");
  let [lastName, setlastName] = useState("");
  let [middleName, setmiddleName] = useState("");
  let [email, setemail] = useState("");
  let [phone, setphone] = useState("");
  let [message, setmessage] = useState("");

  async function handlesend(e) {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/message/send",
          { firstName, lastName, middleName, email, phone, message },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setfirstName(""),
            setlastName(""),
            setmiddleName(""),
            setemail(""),
            setphone(""),
            setmessage("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <div className="relative w-full bg-green-100">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
            <h1 className="mt-8 text-3xl font-bold tracking-tight text-green-700 md:text-4xl lg:text-6xl">
              People who care about your Health
            </h1>
            <p className="mt-8 text-lg text-green-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur modi blanditiis dolores quasi eaque explicabo!
            </p>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6 p-3">
            <img
              className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[700px] xl:aspect-[16/9]"
              src={images}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="bg-green-100 flex items-center justify-center w-full p-8">
        <div className="w-full">
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5  w-full grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-green-700"
                >
                  {" "}
                  First Name{" "}
                </label>
                <div className="mt-6">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="First Name"
                    id="name"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-green-700"
                >
                  {" "}
                  Last Name{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Last Name"
                    id="name"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-green-700"
                >
                  {" "}
                  Middle Name{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="last Name"
                    id="name"
                    value={middleName}
                    onChange={(e) => setmiddleName(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-green-700"
                >
                  {" "}
                  Contact No.{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="number"
                    placeholder="contact"
                    id="name"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                  ></input>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-green-700"
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
                    className="text-base font-medium text-green-700"
                  >
                    {" "}
                    Message{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <textarea
                    rows={4}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Message..."
                    id="password"
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="col-start-1 col-end-3">
                <button
                  type="button"
                  onClick={handlesend}
                  className="inline-flex w-full items-center justify-center rounded-md bg-green-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Send Message <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
