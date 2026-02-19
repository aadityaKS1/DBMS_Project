import React from 'react';
import banner1 from '../Assets/banner1.png';
import banner2 from '../Assets/banner2.jpg';
import { NavLink } from "react-router-dom";

const HeroSection = () => {
    return (
        <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">

            {/* Layered Background Images */}
            <img
                src={banner1}
                alt="Background Layer 1"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
            />
            <img
                src={banner2}
                alt="Background Layer 2"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
            />

            {/* Dark overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#0A365F] opacity-60"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
                    Together We Rebuild <br />
                    <span className="text-[#E87C1E]">Nepal’s Future</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-200 mb-8">
                    Report infrastructure damage, coordinate repairs, and help communities recover faster with AI-powered insights.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                    {/* Report Damage Button */}
                   <NavLink to="/report">
  <button
    className="px-8 py-4 bg-[#E87C1E] text-white font-bold text-lg rounded-lg shadow-lg
               hover:bg-orange-500 hover:scale-105 transition-transform duration-300"
  >
    Report Damage
  </button>
</NavLink>


                    {/* View Active Tasks Button */}
                    <button className="px-8 py-4 text-[#0A365F] border-2 border-[#0A365F] font-bold text-lg rounded-lg
                     hover:bg-[#0A365F] hover:text-white shadow-md transition-all duration-300">
                        View Active Tasks
                    </button>
                </div>

            </div>
        </section>


    );
};

export default HeroSection;