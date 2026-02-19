import React, { useContext } from "react";
import logo from "../Assets/punanirman_logo.png";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext"; 

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="sticky top-0 left-0 w-full bg-white/90 shadow-sm z-50">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo + Name Section */}
        <div className="flex items-center gap-3">
          <NavLink to="/">
            <img src={logo} alt="Rotaract Club Logo" className="w-12 h-auto" />
          </NavLink>
          <h1 className="font-bold text-xl text-[#2F3B65FF]">पुनर्निर्माण</h1>
        </div>

        {/* Menu + Buttons */}
        <div className="flex items-center gap-8">

          {/* Navigation Menu */}
          <nav className="flex gap-6 text-base leading-6 font-normal text-gray-900">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition duration-200 hover:text-[#FF7B00FF] font-semibold
                ${isActive ? "text-[#FF7B00FF] border-b-2 border-[#FF7B00FF]" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/damages"
              className={({ isActive }) =>
                `transition duration-200 hover:text-[#FF7B00FF] font-semibold
                ${isActive ? "text-[#FF7B00FF] border-b-2 border-[#FF7B00FF]" : ""}`
              }
            >
              Damages
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition duration-200 hover:text-[#FF7B00FF] font-semibold
                ${isActive ? "text-[#FF7B00FF] border-b-2 border-[#FF7B00FF]" : ""}`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `transition duration-200 hover:text-[#FF7B00FF] font-semibold
                ${isActive ? "text-[#FF7B00FF] border-b-2 border-[#FF7B00FF]" : ""}`
              }
            >
              Contact Us
            </NavLink>
          </nav>

          {/* Sign Up / Profile Button */}
          {user ? (
            <NavLink
              to={user.role === "organization" ? "/club" : "/volunteer"}
              className="bg-[#4A90E2FF] text-white font-semibold px-6 py-2 rounded-lg
                         hover:bg-[#4A90E2FF] hover:scale-105
                         transition-[colors,transform] duration-300"
            >
              Profile
            </NavLink>
          ) : (
            <NavLink
              to="/signup"
              className="bg-[#4A90E2FF] text-white font-semibold px-6 py-2 rounded-lg
                         hover:bg-[#4A90E2FF] hover:scale-105
                         transition-[colors,transform] duration-300"
            >
              Sign Up
            </NavLink>
          )}

          {/* Donate Button (always shown) */}
          <NavLink
            to="/donate"
            className="bg-[#FF7B00FF] text-white font-semibold px-6 py-2 rounded-lg
                       hover:bg-[#FF7B00FF] hover:scale-105
                       transition-[colors,transform] duration-300"
          >
            Donate
          </NavLink>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
