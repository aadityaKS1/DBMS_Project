import React from "react";
import AboutImg from "../../Assets/about_us.png";

const AboutUsHeader = () => {
  return (
    <div className="w-full bg-white py-10">
      <div className="max-w-6xl mx-auto px-2">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-[#004d7c] mb-12">
          About us
        </h2>

        {/* Content */}
        <div className="grid grid-cols-2 gap-20 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={AboutImg}
              alt="Reunite and Rebuild"
              className="rounded-2xl shadow-lg w-full"
            />
          </div>

          {/* Text */}
          <div>
            <h3 className="text-2xl font-bold text-[#085f96] mb-4">
              What is पुनर्निर्माण ?
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              पुनर्निर्माण is an AI-powered post-crisis reconstruction platform built
              to support Nepal’s recovery after disasters and civil unrest. It
              enables citizens and authorities to report damaged public
              infrastructure, uses AI to prioritize recovery needs based on
              severity and impact, and coordinates skilled volunteers and
              organizations through a unified digital system.
            </p>

            <p className="text-gray-700 leading-relaxed">
              By bringing damage reporting, decision-making, and progress tracking
              into one transparent platform, पुनर्निर्माण reduces delays, improves
              accountability, and ensures resources reach the areas that need them
              most. The platform is designed to strengthen community resilience,
              promote skilled civic participation, and enable faster, data-driven
              rebuilding of critical infrastructure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsHeader;