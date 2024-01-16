import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import AddStaff from "./pages/AddStaff.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import UploadImg from "./pages/UploadImg.jsx";

const authHome = () => {
  const access_token = localStorage.access_token
  if(!access_token) {
    throw redirect('/')
  }
  return null
}
const authLogin = () => {
  const access_token = localStorage.access_token
  if(access_token) {
    throw redirect('/home')
  }
  return null
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    loader:authLogin
  },
  {
    path: "/home",
    element: <Home />,
    loader: authHome
  },
  {
    path: "/createProduct",
    element: <CreateProduct/>
  },
  {
    path: "/categories",
    element: <Category />
  },
  {
    path: "/addStaff",
    element: <AddStaff/>
  },
  {
    path: "/editProduct/:id",
    element: <EditProduct/>
  },
  {
    path: "/uploadImg/:id",
    element: <UploadImg/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
