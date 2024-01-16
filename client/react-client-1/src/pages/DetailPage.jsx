import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import CardItem from "../components/CardItem";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const [listProducts, setListProducts] = useState([]);

  const {id} = useParams()

  // console.log("Type of listProducts:", typeof listProducts); check typedata because error

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: import.meta.env.VITE_BASE_URL + `/pub/products/${id}` ,
      });
      // console.log("Data API:", data);
      // data pada apinya nested
      setListProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (


<section className="bg-white dark:bg-white">
  <Navbar/>
<div className="container px-6 py-10 mx-auto">
  <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Hello!</h1>

  <div className="mt-8 lg:flex lg:items-center">
    <img className="w-full h-65 lg:w-1/2 lg:h-70 rounded-xl mb-6 lg:mb-0" src={listProducts.imgUrl} alt="" />
    
    <div className="lg:w-1/2 lg:ml-6">
  <p className="text-lg text-black uppercase underline font-bold">Product Detail</p>

  <a href="#" className="block mt-4 text-3xl font-semibold text-gray-800 hover:underline dark:text-black md:text-4xl">
    {listProducts.name}
  </a>

  <div className="card-description mt-3 bg-gray-300 rounded-md">
    <p className="text-lg text-gray-500 dark:text-black md:text-2xl">
      {listProducts.description}
    </p>
  </div>

  <p className="text-lg text-black dark:text-black md:text-lg group-hover:text-orange-500 hover:underline transition">
  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(listProducts.price)}
  </p>

  <a href="#" className="inline-block mt-2 text-blue-500 underline hover:text-blue-400 text-lg">
    Buy now
  </a>

  <div className="flex items-center mt-6">
    <div className="mx-4">
      <h1 className="text-lg text-gray-700 dark:text-black font-bold">Ataraxia.co</h1>
      <p className="text-lg text-gray-500 dark:text-gray-400">now get your kit</p>
    </div>
  </div>
</div>
  </div>
</div>
</section>




  );
};

export default DetailPage;
