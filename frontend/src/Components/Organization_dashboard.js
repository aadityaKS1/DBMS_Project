import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  PlusSquare,
  LogOut,
  History,
} from "lucide-react";

import EventCard from "./EventCard";
import avatar from "../Assets/profilevol.png";
import { AuthContext } from "./AuthContext";

/* =========================================================
   MAIN DASHBOARD
========================================================= */

function Organization_dashboard() {
  const [pastEvents, setPastEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchOrgEvents();
  }, []);

  const fetchOrgEvents = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/org_events/${user?.id}/`
      );
      const data = await response.json();

      // 🔥 categorize by status
      setPastEvents(data.filter((e) => e.status === "completed"));
      setOngoingEvents(data.filter((e) => e.status === "ongoing"));
      setPendingEvents(data.filter((e) => e.status === "pending"));
    } catch (err) {
      console.error("Failed to load org events", err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <HeaderSection />
        <StatsSection
          past={pastEvents.length}
          ongoing={ongoingEvents.length}
          pending={pendingEvents.length}
        />
        <OrgMainSection
          pastEvents={pastEvents}
          ongoingEvents={ongoingEvents}
          pendingEvents={pendingEvents}
        />
      </div>
    </div>
  );
}

export default Organization_dashboard;

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <aside className="w-64 min-h-screen my-4 bg-white shadow-lg rounded-xl p-6 flex flex-col">
      <div className="flex flex-col items-center border-b pb-6">
        <img
          src={avatar}
          alt="Profile"
          className="h-16 w-16 rounded-full object-cover mb-3"
        />
        <h2 className="text-sm font-bold">
          {user?.name || "Organization"}
        </h2>
        <p className="text-xs text-gray-500">Organization</p>
      </div>

      <nav className="mt-6 space-y-2 flex-1">
        <NavItem to="/club" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/report" icon={PlusSquare} label="Create Event" />
        <NavItem to="/club-history" icon={History} label="Event History" />

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm rounded-xl text-gray-600 hover:bg-gray-100"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </nav>
    </aside>
  );
}

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition ${
          isActive
            ? "bg-blue-100 text-blue-700 font-medium"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </NavLink>
  );
}

/* =========================================================
   HEADER
========================================================= */

function HeaderSection() {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#4A90E2FF] rounded-t-2xl" />

      <div className="relative">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.name || "Organization"}
          </h1>

          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#4A90E2FF] text-white">
            ★ Organization
          </span>
        </div>

        <p className="text-gray-600 mt-2">{user?.email}</p>
      </div>
    </div>
  );
}

/* =========================================================
   EVENTS SECTION
========================================================= */

function OrgMainSection({ pastEvents, ongoingEvents, pendingEvents }) {
  return (
    <div className="px-2">
      <Section title="Past Events" events={pastEvents} />
      <Section title="Ongoing Events" events={ongoingEvents} />
      <Section title="Pending Events" events={pendingEvents} />
    </div>
  );
}

function Section({ title, events }) {
  return (
    <div className="max-w-6xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-6">{title}</h2>

      {events?.length === 0 ? (
        <p className="text-gray-500">No events found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          Show More
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   STATS
========================================================= */

function StatsSection({ past, ongoing, pending }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard value={pending} title="Upcoming Events" />
      <StatCard value={ongoing} title="Ongoing Events" />
      <StatCard value={past} title="Event History" />
    </div>
  );
}

function StatCard({ value, title }) {
  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="text-3xl font-bold text-[#4A90E2FF]">{value}</p>
    </div>
  );
}