// EventCard.js
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";




const EventCard = ({ event }) => {
  const {
    title = "Untitled Project",
    date = "N/A",
    location = "N/A",
    description = "",
    image = "",
    priority = "Ongoing",
    progress = 0,
    aiBadge = ""
  } = event || {};

  return (
<div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-[350px] mx-auto">
      
      {/* Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4 space-y-2">
        {/* Title + Priority */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        </div>

        {/* AI Badge */}
        {aiBadge && (
          <span className="inline-block px-2 py-0.5 text-xs font-medium bg-yellow-300 text-black rounded">
            {aiBadge}
          </span>
        )}

        {/* Date & Location */}
        <p className="text-gray-600 text-sm flex items-center gap-1">
          <span>{date}</span>
          <FaMapMarkerAlt className="text-gray-500 w-3 h-3" />
          <span>{location}</span>
        </p>

        {/* Description */}
        <p className="text-gray-700 text-sm line-clamp-2">{description}</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full"
            style={{ width: `${progress}%`, backgroundColor: "#0A365F" }}
          ></div>
        </div>

        {/* Call-to-Action */}
        <button className="mt-2 px-3 py-1 text-sm font-semibold rounded bg-[#0A365F] hover:bg-blue-600 text-white transition-colors duration-300">
          Join Project
        </button>
      </div>
    </div>
  );
};

export default EventCard;
