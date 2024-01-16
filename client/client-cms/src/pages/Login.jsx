import React from "react";

import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const {data} = await axios({
        method: "post",
        url: import.meta.env.VITE_BASE_URL + "/login",
        data: input
      })
      localStorage.access_token = data.access_token;
      localStorage.setItem('id', data.id )
      // console.log(data);
      navigate('/home')
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(input);

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form onSubmit={handleSubmit}>
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-black mb-8">
            Welcome back! Please enter your details
          </span>
          <div className="py-4" >
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="password"
              id="pass"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-24">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <span className="text-md">Remember me</span>
            </div>
            <span className="font-bold text-md">Forgot password</span>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
          >
            Sign in
          </button>

          <div className="text-center text-gray-400">
            Dont'have an account?
            <span className="font-bold text-black">Sign up for free</span>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://i.pinimg.com/564x/df/fd/96/dffd9676760a0b2aec1bf97f1bc71615.jpg"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
      </form>
    </div>
  );
};

export default Login;
