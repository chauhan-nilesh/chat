import React from "react";
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-white shadow-md px-2 lg:px-28 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Chitchat</h1>

        <nav className="hidden md:flex space-x-6">
          <Link to={""} className="hover:text-yellow-500">
            Product
          </Link>
          <Link to={""} className="hover:text-yellow-500">
            Resources
          </Link>
          <Link to={""} className="hover:text-yellow-500">
            Pricing
          </Link>
          <Link to={""} className="hover:text-yellow-500">
            Integrations
          </Link>
        </nav>

        <div>
          <Link to={"/login"}
            className="text-gray-800 px-4 py-2 text-sm lg:text-base font-semibold hover:text-yellow-500"
          >
            Sign In
          </Link>
          <Link to={"/register"}
            className="bg-yellow-500 text-slate-950 text-sm lg:text-base font-semibold px-4 py-2 rounded hover:bg-yellow-600"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;