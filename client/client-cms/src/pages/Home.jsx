import React from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const Home = () => {
  const navigate = useNavigate();
  const [listProducts, setListProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...listProducts].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setListProducts(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...listProducts].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setListProducts(sorted);
      setOrder("ASC");
    }
  };

  const fetchData = async () => {
    try {
      const { data, headers } = await axios({
        method: "get",
        url: import.meta.env.VITE_BASE_URL + "/products",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      // console.log("Data API:", data);
      // data pada apinya nested
      setListProducts(data);

      const totalPages = parseInt(headers['x-total-pages'], 10);
      setTotalPages(totalPages);
    } catch (error) {
      console.log(error);
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

  const handleDelete = async (productId) => {
    try {
      await axios({
        method: "delete",
        url: import.meta.env.VITE_BASE_URL + `/products/${productId}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      //tangkap kembali datanya yg terbaru
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <SearchBar onSearch={handleSearch} />
      <button onClick={() => sorting("name")}>Order by name</button>
      <table
        className="table border-b"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        {/* head */}
        <thead className="text-center text-gray-500">
          <tr>
            <th className="border-b-2 border-t-2 border-r-2 border-l-2">Id</th>
            <th className="border-b-2 border-t-2 border-r-2 border-l-2">
              Name
            </th>
            <th className="border-b-2 border-t-2 border-r-2 border-l-2">
              Description
            </th>
            <th className="border-b-2 border-t-2 border-r-2 border-l-2">
              Stock
            </th>
            <th className="border-b-2 border-t-2 border-r-2 border-l-2">
              Price
            </th>
            <th className="border-b-2 border-t-2 border-r-2 border-l-2">
              Image Url
            </th>
            <th className="border-b-2 border-t-2 border-r-2 border-l-2">
              Category Id
            </th>
            <th className="border-b-2 border-t-2 border-r-2 border-l-2">
              Author Id
            </th>
            <th className="border-b-2 border-t-2 border-r-2 border-l-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {listProducts.map((product) => (
            <tr key={product.id}>
              <td className="border-r border-b-2">{product.id}</td>
              <td className="border-r border-b-2">{product.name}</td>
              <td className="border-r border-b-2">{product.description}</td>
              <td className="border-r border-b-2">{product.stock}</td>
              <td className="border-r border-b-2">{product.price}</td>
              <td className="border-r border-b-2">{product.imgUrl}</td>
              <td className="border-r border-b-2">{product.categoryId}</td>
              <td className="border-r border-b-2">{product.authorId}</td>

              <td className="text-center space-y-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    navigate(`/editProduct/${product.id}`);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-1 py-1 rounded"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
