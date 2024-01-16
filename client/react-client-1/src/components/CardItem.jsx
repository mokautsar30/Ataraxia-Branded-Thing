import React from "react";
import { useNavigate } from "react-router-dom";

const CardItem = ({listProduct}) => {
  const navigate = useNavigate()
  return (
    <div className="musthave__card bg-white rounded-lg overflow-hidden shadow-lg mb-4">
      <img
        src={listProduct.imgUrl}
        alt="must have"
        className="object-cover w-full h-65"
      />
      <div className="p-4">
        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        onClick={() => {
          navigate("/detail/" + listProduct.id)
        }}>click</button>
        <h4 className="text-lg font-semibold mb-2">{listProduct.name}</h4>
        <p className="text-gray-500 mb-2">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(listProduct.price)}</p>
      </div>
    </div>
  );
};

export default CardItem;
