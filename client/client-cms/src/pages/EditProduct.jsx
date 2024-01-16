import React from "react";
import { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import imageLogo from "../assets/img/logo.png";
import { useEffect } from "react";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imgUrl: "",
    categoryId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: import.meta.env.VITE_BASE_URL + `/products/${id}`,
          data: formData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        setFormData(data)
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(import.meta.env.VITE_BASE_URL + `/products/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })

      // console.log(data);
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(formData);
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-1">
          <img src={imageLogo} alt="Logo" className="w-40 h-30" />
        </div>
        <div className="container mx-auto p-2">
          <h1 className="text-2xl font-semibold text-center text-gray-500 mt-6 mb-6 underline">
            Edit Product
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 text-sm text-gray-600 font-bold"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block mb-2 text-sm text-gray-600 font-bold"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block mb-2 text-sm text-gray-600 font-bold"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="stock"
                className="block mb-2 text-sm text-gray-600 font-bold"
              >
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="imgUrl"
                className="block mb-2 text-sm text-gray-600 font-bold"
              >
                Image Url
              </label>
              <input
                type="text"
                id="imgUrl"
                name="imgUrl"
                value={formData.imgUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="categoryId"
                className="block mb-2 text-sm text-gray-600 font-bold"
              >
                Category Id
              </label>
              <select
              id="categoryId"
              name="categoryId"
              value= {formData.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              
            >
                <option value={0}>Select a category</option>
                <option value={1}>Loose Fit</option>
                <option value={2}>Turquoise</option>
                <option value={3}>Men</option>
                <option value={4}>Women</option>
                <option value={5}>Bag</option>
                <option value={6}>Shoes</option>
            </select>
            </div>
            <button
              type="submit"
              className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
            >
              Edit Product
            </button>
          </form>
        </div>
        <p className="text-xs text-gray-600 text-center mt-8">
          &copy; 2023 WCS LAT
        </p>
      </div>
    </div>
  );
};

export default EditProduct;
