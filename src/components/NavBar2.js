import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo_new.jpg";

export default function  NavBar2() {

    const navigate = useNavigate();
    return(
      <div className="w-full h-full">
<div className="navbar bg-white rounded-3xl mt-5">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg> */}
        <p
        OnClick={() => navigate("/")}>Cryptic Crowns</p>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a
         onClick={() => navigate("/register")}>Register</a></li>
        <li>
          <a>About</a>
        
        </li>
        <li><a
        
        onClick={() => navigate("/")}>Home</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Cryptic Crowns</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a className="text-black"
       onClick={() => navigate("/")}>Home</a></li>
      <li>
    <a className="text-black"
    onClick={() => navigate("/register")}>Register</a>
      </li>
      <li><a className="text-black">About</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn text-white"
    onClick={() => navigate("/login")}>Login</a>
  </div>
</div>
</div>
    )
}
