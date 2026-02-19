// OngoingProjectCard.js
import React from "react";

const OngoingProjectCard = ({ project }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-md mb-3"/>
      <h3 className="text-lg font-bold">{project.title}</h3>
      <p className="text-sm text-gray-600">{project.organization}</p>
      <p className="text-sm mt-1">{project.date} | {project.time || ""}</p>
      <p className="text-sm text-gray-500">{project.location}</p>
      <div className="mt-2 bg-gray-200 h-2 rounded">
        <div className="bg-[#E87C1E] h-2 rounded" style={{ width: `${project.progress || 0}%` }}></div>
      </div>
      {project.onSignUp && (
        <button
          className="mt-3 bg-[#0A365F] text-white px-4 py-2 rounded hover:bg-[#08466b]"
          onClick={project.onSignUp}
        >
          Sign Up
        </button>
      )}
    </div>
  );
};

export default OngoingProjectCard;
