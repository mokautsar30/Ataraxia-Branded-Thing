import React from "react";
import logo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button  onClick={() => {
                  navigate(`/uploadImg/:id`);
                }}>

              Upload Img
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/categories");
                }}
              >
                Category
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/addStaff");
                }}
              >
                Add-Staff
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a href="/home" className="btn btn-ghost text-xl">
          ATARAXIA DASHBOARD
        </a>
      </div>
      <div className="navbar-end">
        <button
          onClick={() => {
            navigate("/createProduct");
          }}
          className="btn btn-outline btn-sm"
          style={{ marginLeft: "75%", marginRight: "auto" }}
        >
          Add Product
        </button>
        <button
          onClick={() => {
            navigate("/");
            localStorage.removeItem("access_token");
          }}
          className="btn btn-outline btn-sm"
          style={{ marginLeft: "auto", marginRight: "10px" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
