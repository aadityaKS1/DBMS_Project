// EventsPageFull.js
import React, { useState, useEffect } from "react";
import EventCard from "../Components/EventCard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import d1 from "../Assets/damages/d1.jpg";
import d2 from "../Assets/damages/d2.jpg";
import d3 from "../Assets/damages/d3.jpg";

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
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/reports/")
      .then((res) => res.json())
      .then((data) => {
        // 🔥 Transform DB → EventCard format
        const formatted = data.map((item, index) => ({
          title: item.infrastructure_type || "Damage Report",
          date: item.created_at?.slice(0, 10) || "Recent",
          location: item.district,
          description: `Volunteers needed: ${item.volunteers_required}`,
          image: [d1, d2, d3][index % 3],
          priority: "High Urgency",
          progress: Math.floor(Math.random() * 100),
          aiBadge: "AI Recommended",
        }));

        setDbReports(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);
  // ===== Sample Damages Data =====
  // const recommendedEvents = [
  //   {
  //     title: "Road Reconstruction",
  //     date: "Oct 26, 2025",
  //     location: "Kathmandu",
  //     description: "Fixing roads damaged by recent floods.",
  //     image: d1,
  //     priority: "High Urgency",
  //     progress: 50,
  //     aiBadge: "AI Recommended",
  //   },
  //   {
  //     title: "After School Tutoring Program",
  //     date: "Oct 26, 2025",
  //     location: "Lalitpur",
  //     description: "Tutoring children in math and science.",
  //     image: d2,
  //     priority: "High Urgency",
  //     progress: 20,
  //   },
  //   {
  //     title: "Urban Reforestation Project",
  //     date: "Oct 26, 2025",
  //     location: "Kathmandu",
  //     description: "Planting trees in urban areas.",
  //     image: d3,
  //     priority: "High Urgency",
  //     progress: 100,
  //   },
  // ];

  // const ongoingProjects = [
  //   {
  //     title: "Community Library Setup",
  //     date: "Oct 28 - 30, 2024",
  //     location: "Kathmandu",
  //     description: "Setting up libraries in underserved communities.",
  //     image: d2,
  //     priority: "Medium Urgency",
  //     progress: 64,
  //   },
  //   {
  //     title: "Neighborhood Health Camp",
  //     date: "Nov 1 - 2, 2024",
  //     location: "Lalitpur",
  //     description: "Providing free medical check-ups for local residents.",
  //     image: d3,
  //     priority: "High Urgency",
  //     progress: 30,
  //   },
  // ];

  // const communityProjects = [
  //   {
  //     title: "Urban Reforestation",
  //     date: "Oct 28, 2024",
  //     location: "Kathmandu",
  //     description: "Planting trees in city parks.",
  //     image: d3,
  //     priority: "Low Urgency",
  //     progress: 40,
  //   },
  //   {
  //     title: "Community Clean-up",
  //     date: "Oct 29, 2024",
  //     location: "Lalitpur",
  //     description: "Neighborhood clean-up drive.",
  //     image: d3,
  //     priority: "Medium Urgency",
  //     progress: 60,
  //   },
  // ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Filters Section */}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-10 flex flex-col gap-16">
        {loading ? (
          <p className="text-center text-gray-500">Loading damage reports...</p>
        ) : (
          <EventSection title="🔥 Critical Projects" events={dbReports} />
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// ===== Reusable Event Section Component =====
function EventSection({ title, events }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-[#0A365F]">{title}</h2>

      {events?.length === 0 ? (
        <p className="text-gray-500">No damage reports found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <div key={idx} className="flex justify-center">
              <div className="w-[360px] h-[500px]">
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
