import React from "react";
import { Outlet, Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-primary text-white shadow-lg">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="text-2xl font-bold">
            <Link to="/" className="hover:text-gray-200">Linktree</Link>
          </div>
          <div className="space-x-4">
            <Link
              to="/pokemon"
              className="hover:bg-blue-500 px-4 py-2 rounded-md transition-colors duration-300"
            >
              API Pokemon
            </Link>
            <Link
              to="/starwars"
              className="hover:bg-blue-500 px-4 py-2 rounded-md transition-colors duration-300"
            >
              API Star Wars
            </Link>
          </div>
        </div>
      </div>

      {/* Content area for the current route */}
      <div className="container mx-auto mt-8 px-4">
        <Outlet />
      </div>
    </>
  );
};

export default Home;
