import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [items, setItems] = useState([]);

  const fetchItems = async (page) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setItems(response.data.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div>
      <ul>
        {items && items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button key={page} onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;