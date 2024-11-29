import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const home = () => {


  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/pokemon" className="px-1 hover:bg-gray-700">API Pokemon</Link>
          <Link to="/starwars" className="px-1 hover:bg-gray-700">API starwars</Link>
          <Link to='/linktree' className="px-1 hover:bg-gray-700">Linktree</Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default home;
