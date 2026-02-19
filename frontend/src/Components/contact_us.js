// React component written in plain JavaScript (no TypeScript)
import React from "react";
import ContactImg from "../Assets/contact_img.png";
import ContactMap from "../Assets/contactUs_map.png";

const Contact_us = () => {
  return (
    <div className="w-full bg-gray-50">
      {/* Header Image */}
      <div className="w-full h-96 relative">
        <img
          src={ContactImg}
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/40" />
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-32 items-center">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email Address:
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Subject:
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Your Message:
                </label>
                <textarea
                  rows="5"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2 rounded-md transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="rounded-md overflow-hidden shadow-md">
            <img
              src={ContactMap}
              alt="Map"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact_us;
