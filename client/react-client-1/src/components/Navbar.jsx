import React, { useState } from "react";
import { Link } from "react-scroll";
import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import SectionListProduct from "./SectionListProduct";

const Navbar = () => {
  const [isMobileMenu, setMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };

  return (
    <header className="bg-white text-gray-500">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          {/* logo */}
          <a href="/">
            <img src={logo} alt="" className="h-20 mr-10" />
          </a>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden ml-auto text-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <ul
          className={`md:flex md:items-center md:justify-end space-x-4 ${
            isMobileMenu ? "block" : "hidden"
          }`}
        >
          <li>
            <a
              href="/"
              className="block md:inline-block text-center md:text-left hover:text-gray-300 font-bold"
            >
              Home
            </a>
          </li>
          <li>
          <Link
              to= "sectionListProduct"
              smooth={true}
              duration={500}
              className="block md:inline-block text-center md:text-left hover:text-gray-300 font-bold"
            >
              Product
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="block md:inline-block text-center md:text-left hover:text-gray-300 font-bold"
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* bag, search, account btn */}
        <div className="md:flex space-x-4">
          <a href="" className="text-xl hover:text-gray-300">
            <FaSearch />
          </a>
          <a href="" className="text-xl hover:text-gray-300">
            <FaUser />
          </a>
          <a href="" className="text-xl hover:text-gray-300">
            <FaShoppingBag />
          </a>
        </div>
        {/* bag, search, account btn */}
      </nav>
    </header>
  );
};

export default Navbar;
