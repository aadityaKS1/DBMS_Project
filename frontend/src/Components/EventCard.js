// EventCard.js
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EventCard = ({
  event,
  onApply,
  onWithdraw,
  allowNavigate = false, // ✅ explicit control
}) => {
  const navigate = useNavigate();

  const {
    id,
    title = "Untitled Project",
    date = "N/A",
    location = "N/A",
    description = "",
    image = "",
    aiBadge = "",
    status = "pending", // ✅ important
  } = event || {};

  const progress =
    event?.progress !== undefined ? event.progress : 30;

  /* =========================================================
     BUTTON HANDLER
  ========================================================= */
  const handleNavigate = () => {
    if (allowNavigate) {
      navigate(`/event/${id}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition max-w-sm mx-auto">
      {/* Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4 space-y-2">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>

        {/* AI Badge */}
        {aiBadge && (
          <span className="inline-block px-2 py-0.5 text-xs font-medium bg-yellow-300 text-black rounded">
            {aiBadge}
          </span>
        )}

        {/* Date & Location */}
        <p className="text-gray-600 text-sm flex items-center gap-1">
          <span>{date}</span>
          <FaMapMarkerAlt className="w-3 h-3" />
          <span>{location}</span>
        </p>

        {/* Description */}
        <p className="text-gray-700 text-sm line-clamp-2">
          {description}
        </p>

        {/* Progress */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden flex">
          <div
            className="h-full bg-[#0A365F]"
            style={{ width: `${progress}%` }}
          />
          <div
            className="h-full bg-blue-500"
            style={{ width: `${100 - progress}%` }}
          />
        </div>

        {/* ================= BUTTON AREA ================= */}

        {/* ✅ ASSIGNED */}
        {status === "assigned" && (
          <div className="mt-2 w-full py-2 text-center text-sm font-semibold rounded bg-green-100 text-green-700">
            ✓ Assigned
          </div>
        )}

        {/* ✅ APPLIED → show withdraw */}
        {status === "applied" && onWithdraw && (
          <button
            onClick={onWithdraw}
            className="mt-2 w-full px-3 py-2 text-sm font-semibold rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Withdraw Application
          </button>
        )}

        {/* ✅ NOT APPLIED → show apply */}
        {status === "pending" && onApply && (
          <button
            onClick={onApply}
            className="mt-2 w-full px-3 py-2 text-sm font-semibold rounded bg-[#0A365F] hover:bg-blue-600 text-white"
          >
            Apply to Project
          </button>
        )}

        {/* ✅ PURE NAVIGATION MODE */}
        {!onApply && !onWithdraw && allowNavigate && (
          <button
            onClick={handleNavigate}
            className="mt-2 w-full px-3 py-2 text-sm font-semibold rounded bg-[#0A365F] hover:bg-blue-600 text-white"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;