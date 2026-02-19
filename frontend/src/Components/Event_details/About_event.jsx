// EventDetails.jsx
import React from "react";
import mapImage from "../../Assets/map.png";

const EventDetails = () => {
  return (<>
    <div className="w-[1272px] mx-auto my-12 bg-[#f3f4f6] shadow-md rounded-lg p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-blue-700 mb-4">About the Event</h2>
      <p className="text-[#171a1f] mb-6">
        Our organization, the Friends of Central Park, is hosting a volunteer cleanup event to beautify our local green space and promote environmental awareness in the community. As many residents use the park for exercise and leisure, maintaining its cleanliness is essential for everyone's health and enjoyment.
      </p>
      <p className="text-[#171a1f] mb-6">
        The event will take place on Saturday, December 14, 2024, from 10:00 AM to 2:00 PM, meeting at the Central Park East Gate entrance. The goal is to remove litter and improve the paths to prevent the spread of disease and make the park a more sustainable environment. We will provide some basic supplies, but we ask all participants to bring their own equipment like garbage bags, gloves, and a grass cutter if possible.
      </p>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Number of Volunteers */}
        <div className="bg-[#f2f7fd] p-4 rounded-md">
          <h3 className="font-bold mb-2 font-['Poppins'] text-[32px] leading-[48px] text-[#171A1F]">Number of Volunteers Required</h3>
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div className="bg-blue-400 h-4 rounded-full w-1/5 text-center text-white text-xs">20</div>
          </div>
        </div>

        {/* Urgency Level */}
        <div className="bg-[#f2f7fd] p-4 rounded-md flex flex-col justify-between">
          <h3 className="font-bold mb-2 font-['Poppins'] text-[32px] leading-[48px] text-[#171A1F]">Urgency Level</h3>
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm w-max">High</span>
        </div>

        {/* Skills Required */}
        <div className="bg-[#f2f7fd] p-4 rounded-md">
          <h3 className="font-bold mb-2 font-['Poppins'] text-[32px] leading-[48px] text-[#171A1F]">Skills Required:</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">Engineering</span>
            <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">Construction</span>
            <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">Health</span>
          </div>
        </div>

        {/* Event Type */}
        <div className="bg-[#f2f7fd] p-4 rounded-md">
          <h3 className="font-bold mb-2 font-['Poppins'] text-[32px] leading-[48px] text-[#171A1F]">Event Type</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">Community Outreach</span>
            <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">Animal Welfare</span>
            <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">Education</span>
            <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">Environment</span>
          </div>
        </div>

        {/* Map */}
        <div className="bg-[#f2f7fd] p-4 rounded-md">
          <h3 className="font-bold mb-2 font-['Poppins'] text-[32px] leading-[48px] text-[#171A1F]">Reporting Location</h3>
          <img src={mapImage} alt="Reporting Location" className="rounded-md w-[367px] h-auto" />
        </div>

        {/* Organizer */}
        <div className="bg-[#f2f7fd] p-4 rounded-md">
          <h3 className="font-bold mb-2 font-['Poppins'] text-[24px] leading-[36px] text-[#171A1F]">Organizer</h3>
          <p className="text-blue-600 font-semibold text-[24px] leading-[36px] underline ">Global community Initiative</p>
          <p className="text-gray-600 text-sm">
            The world's largest international conservation organization, dedicated to reducing human impact on the environment and protecting the planet's natural resources.
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-around gap-2 mb-6">
        <h3 className="font-semibold text-[#171a1f] mb-2 text-[32px] leading-[48px]">Progress:</h3>
        <div className="mb-1 w-[900px] bg-gray-300 rounded-full h-4 ">
          <div className="bg-blue-500 h-4 mb-2 rounded-full w-3/4"></div>
        </div>
      </div>
    </div>

    {/* // Join Reconstruction Task Button */}
    <div className="flex items-center justify-center mb-12">
      <button
        class="w-[400px] h-[60px] px-3 flex items-center justify-center font-inter text-[24px] leading-[36px] font-bold  text-white bg-[#004492] rounded-[22px] shadow-[0_8.5px_13.75px_rgba(23,26,31,0.22),0_0_2px_rgba(23,26,31,0.08)] hover:bg-[#004492] active:bg-[#004492] disabled:opacity-40">Join Reconstruction Task
      </button>
    </div>


  </>);
};

export default EventDetails;
