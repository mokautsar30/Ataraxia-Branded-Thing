import { useState } from "react";

const SearchBar = ({ onSearch }) => {
 const [search, setSearch] = useState("");

 const handleChange = (e) => {
    setSearch(e.target.value);
 };

 const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
 };

 return (
    <form onSubmit={handleSubmit} className="mt-5 flex">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        className="border p-2 rounded-l-md w-full focus:outline-none bg-slate-200"
        placeholder="Search products by name..."
      />
      <button type="submit" className="bg-black text-white p-2 rounded-r-md hover:bg-gray-600 focus:outline-none">
        Search
      </button>
    </form>
 );
};

export default SearchBar;