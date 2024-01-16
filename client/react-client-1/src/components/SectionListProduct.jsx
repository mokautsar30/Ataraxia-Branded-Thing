import React, { useEffect, useState } from "react";
import axios from "axios";
import CardItem from "./CardItem";
import Button from "./Button";
import SearchBar from "./SearchBar";

const SectionListProduct = () => {
  const [listProducts, setListProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  // console.log("Type of listProducts:", typeof listProducts); check typedata because error

  const fetchData = async (categoryId = '') => {
    try {
      const { data } = await axios({
        method: "get",
        url: import.meta.env.VITE_BASE_URL + "/pub/products",
        params: {
          categoryId: categoryId
        }
      });
      // console.log("Data API:", data);
      // data pada apinya nested
      setListProducts(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = (search) => {
    setSearchQuery(search);
 };

 useEffect(() => {
  if (searchQuery) {
    const filteredProducts = listProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setListProducts(filteredProducts);
  } else {
    fetchData();
  }
}, [searchQuery]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategory = (category) => {
    setSelectedCategory(category);
    fetchData(category)
  };

  return (
    <div id="sectionListProduct" className="bg-white">
      <SearchBar onSearch={handleSearch}/>
      <section className="section__container musthave__container ">
        <h2 className="section__title text-4xl font-bold mb-6 text-center text-gray-500 underline">
          Must Have
        </h2>
       <Button onCategoryChange={handleCategory}/>
        <div className="musthave__grid grid grid-cols-1 md:grid-cols-3 gap-6 mx-4 md:mx-8">
          {listProducts &&
            listProducts.map((listProduct) => {
              return (
                <CardItem key={listProduct.id} listProduct={listProduct}/>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default SectionListProduct;
