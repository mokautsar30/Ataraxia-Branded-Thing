import React from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const UploadImg = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [file, setFile] = useState(null)

  const handleChange = (event) => {
    const image = event.target.file[0];
    if (image) {
      setFile(image);
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("imgUrl", file);

      const {data} = await axios({
        method:"patch",
        url: import.meta.env.VITE_BASE_URL + `/products/${params.id}/img-url`,
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          "Content-Type":"multipart/form-data",
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Upload Image for Product</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Choose Image:
          <input type="file" name="imgUrl" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Upload Image</button>
      </form>
    </div>
  )
}

export default UploadImg