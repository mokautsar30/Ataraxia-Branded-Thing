import React from "react";

const Pagination = () => {
    
  return (
<div className="join flex justify-center items-center bg-white p-2">
  <button className="join-item bg-white text-black hover:bg-gray-300 py-1 px-2 rounded-md text-sm">
    Previous
  </button>
  <button className="join-item bg-white text-black hover:bg-gray-300 py-1 px-2 rounded-md text-sm ml-2">
    Next
  </button >
</div>
  );
};

export default Pagination;
