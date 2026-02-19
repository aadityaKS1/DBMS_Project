import React from "react";
import eventImage from "../../Assets/event_details.png";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";

const EventCard = () => {
    return (
        <div className="relative w-full mx-auto rounded-lg overflow-hidden shadow-lg">
            <img
                src={eventImage}
                alt="Event"
                className="w-full h-[592px] object-cover rounded-none"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 rounded-lg p-6 text-center max-w-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                        Parliament Building Rebuild
                    </h2>
                    <div className="flex justify-center gap-2 flex-wrap mb-3">
                        <span className="bg-orange-200 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
                            Civil Engineer
                        </span>
                        <span className="bg-orange-200 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
                            Architect
                        </span>
                        <span className="bg-orange-200 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
                            Cleaning Support
                        </span>
                        <span className="bg-orange-200 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
                            Electrical Person
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-2 text-gray-700 text-sm">
                        <div className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            Oct 26, 2024 | 9:00 AM - 1:00 PM
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPinIcon className="w-4 h-4" />
                            Central Park, NY
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default EventCard;
