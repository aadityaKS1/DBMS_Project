// MainContent.js
import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import EventCard from "./EventCard";
import SidebarSection from "./SidebarSection";

const MainContent = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sidebar data (static)
  const liveImpact = [
    { text: "14 reports require immediate attention", date: "Dec 19" },
    { text: "Most damages concentrated in Bagmati province", date: "Dec 18" },
  ];

  const urgentNeeds = [
    { text: "5 Volunteers needed for Kathmandu area cleanup", date: "Dec 19" },
    { text: "Medical assistance volunteers required in Lalitpur", date: "Dec 18" },
    { text: "Engineers needed for building safety inspection", date: "Dec 19" },
    { text: "Community helpers required for shelter setup", date: "Dec 18" },
  ];

  const aiSummary =
    "Currently, 14 reports require immediate attention. Most damages are concentrated in the Bagmati province.";

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/events/");
        if (!response.ok) throw new Error("Failed to fetch reports");

        const data = await response.json();

        // ✅ Newest first → sort descending, then take first 4
        const newestFourReports = [...data]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 4);

        // Map backend fields to frontend structure
        const mappedReports = newestFourReports.map((item) => ({
          id: item.id,
          title: item.damage_name,
          date: new Date(item.created_at).toDateString(),
          location: item.reporting_location,
          description: item.damage_desc,
          image: item.image_url || null, // use image_url from serializer
          priority: item.urgency_level,
          skillsRequired: item.skills_required || [],
          progress: 0,
          aiBadge: "AI Verified",
        }));

        setReports(mappedReports);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left: Main Feed */}
            <div className="lg:w-2/3 space-y-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-[#0A365F] border-b-4 border-[#E87C1E] pb-1">
                  Recent Reports
                </h2>
                <button className="text-sm font-bold text-[#E87C1E] hover:underline">
                  View All Reports →
                </button>
              </div>

              {loading ? (
                <p className="text-center text-gray-500">Loading reports...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reports.map((report) => (
                    <EventCard key={report.id} event={report} />
                  ))}
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            <aside className="lg:w-1/3 space-y-8 flex-shrink-0">
              {/* AI Summary */}
              <div className="bg-[#0A365F] text-white p-6 rounded-2xl shadow-lg">
                <h3 className="font-bold text-lg mb-2">AI Summary</h3>
                <p className="text-sm opacity-90 leading-relaxed">{aiSummary}</p>
              </div>

              {/* Live Impact Summary */}
              <SidebarSection title="Live Impact Summary" color="red" items={liveImpact} />

              {/* Urgent Needs */}
              <SidebarSection title="Urgent Needs" color="blue" items={urgentNeeds} />
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainContent;
