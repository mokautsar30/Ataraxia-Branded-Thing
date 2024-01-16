import React from 'react'
import NavBar from '../components/NavBar'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const AddStaff = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    role: 'Staff',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: import.meta.env.VITE_BASE_URL + "/register",
        data: input,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      // console.log(data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(input);
  return (
    <>
    <section className="m-10">
      <NavBar/>
      <form className="max-w-md mx-auto bg-white rounded p-6 shadow-md mt-20" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            name="username"
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            type="number"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            id="phoneNumber"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <textarea
            name="address"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            id="address"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </div>
      </form>
    </section>

  </>
  )
}

export default AddStaff