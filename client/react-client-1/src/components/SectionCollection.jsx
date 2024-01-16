import React from "react";
import CollectionPng from "../assets/img/men-collection.png"

const SectionCollection = () => {
  return (
<div className="container mx-auto p-4 ">
    <section className="flex flex-col-reverse md:flex-row items-center">
        <img src={CollectionPng} alt="collection" className="w-full md:w-1/2 mt-6 md:mt-0 pl-4 rounded-md mb-4 md:mb-0 md:mr-4" />
        <div className="w-full md:w-1/2 ">
            <h2 className="text-3xl md:text-5xl font-bold border-b-4 border-black text-gray-400 pb-2 mb-2 md:mb-4">New Collection</h2>
            <p className="text-lg md:text-xl text-white">#35 ITEMS</p>
            <h4 className="text-lg md:text-xl font-semibold mb-4">Available on Store</h4>
            <button className="btn bg-slate-500">SHOP NOW</button>
        </div>
    </section>
</div>
  );
};

export default SectionCollection;
