import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import NavBar from '../components/NavBar';

const Category = () => {
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: import.meta.env.VITE_BASE_URL + "/categories",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      // console.log("Data API:", data.category);
      
      setCategories(data.category)
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto text-center">
    <NavBar />
    <br />
    <br />
    <div>
      <h1 className="text-3xl font-bold text-white p-4 underline ">Category list</h1>
    </div>
    <table
      className="table table-zebra mx-auto" style={{ width: '10%' }}
    >
      {/* head */}
      <thead className=" text-cyan-200">
        <tr>
          <th></th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Category