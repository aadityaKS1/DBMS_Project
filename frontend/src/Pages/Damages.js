// Damages.js
import React, { useState, useEffect } from "react";
import EventCard from "../Components/EventCard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Damages = () => {
  const [filters, setFilters] = useState({
    location: "",
    projectType: "",
    volunteerSkill: "",
  });

  const [dbReports, setDbReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // ✅ FETCH ONLY ONGOING TASKS
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/ongoing_damages/") // 👈 IMPORTANT
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          id: item.id,
          title: item.infrastructure_type || "Damage Report",
          date: item.created_at?.slice(0, 10) || "Recent",
          location: item.district,
          description: `Volunteers needed: ${item.volunteers_required}`,
          status: "ongoing",
        }));

        setDbReports(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Filters */}
      <div className="bg-white py-6 shadow-md">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Select Location</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Lalitpur">Lalitpur</option>
            </select>

            <select
              name="projectType"
              value={filters.projectType}
              onChange={handleFilterChange}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Project Type</option>
              <option value="Road">Road</option>
              <option value="Education">Education</option>
              <option value="Environment">Environment</option>
            </select>

            <select
              name="volunteerSkill"
              value={filters.volunteerSkill}
              onChange={handleFilterChange}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Volunteer Skill Needed</option>
              <option value="Engineer">Engineer</option>
              <option value="Mason">Mason</option>
              <option value="Labor">Labor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container mx-auto px-4 max-w-7xl py-10 flex flex-col gap-16">
        {loading ? (
          <p className="text-center text-gray-500">
            Loading ongoing damages...
          </p>
        ) : (
          <EventSection title="🔥 Ongoing Recovery Tasks" events={dbReports} />
        )}
      </div>

      <Footer />
    </div>
  );
};

// ===== Section =====
function EventSection({ title, events }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-[#0A365F]">{title}</h2>

      {events?.length === 0 ? (
        <p className="text-gray-500">No ongoing damages found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="flex justify-center">
              <div className="w-[360px]">
                <EventCard event={event} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Damages;
