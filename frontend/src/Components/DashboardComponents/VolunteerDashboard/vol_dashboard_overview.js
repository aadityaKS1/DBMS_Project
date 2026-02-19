import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Calendar, Star, History, LogOut } from "lucide-react";

import avatar from "../../../Assets/rotaract_logo.png";
import { AuthContext } from "../../AuthContext"; // import context

function Vol_dashboard_overview() {
  return (
    <div className="flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <HeaderSection />
        <StatsSection />
      </div>
    </div>
  );
}

export default Vol_dashboard_overview;

/* ===================== Sidebar ===================== */

function Sidebar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("user"); // remove user from localStorage
    setUser(null); // reset context
    navigate("/"); // redirect to homepage
  };

  return (
    <aside className="w-64 h-full my-4 bg-white shadow-lg rounded-xl p-6 flex flex-col">
      {/* Profile */}
      <div className="flex flex-col items-center border-b pb-6">
        <img
          src={avatar}
          alt="Profile"
          className="h-16 w-16 rounded-full object-cover mb-3"
        />
        <h2 className="text-sm font-bold">{user?.name || "John Smith"}</h2>
        <p className="text-xs text-gray-500">{user?.role || "Volunteer"}</p>
      </div>

      {/* Nav */}
      <nav className="mt-6 space-y-2 flex-1">
        <NavItem to="/volunteer" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/" icon={Calendar} label="My Events" />
        <NavItem to="/" icon={Star} label="Recommended Events" />
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
        `w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition
        ${
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

/* ===================== Header ===================== */

function HeaderSection() {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#4A90E2FF] rounded-t-2xl" />

      <div className="relative">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.name || "John Smith"}
          </h1>

          <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-[#4A90E2FF] text-white">
            ★ {user?.role || "Volunteer"}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {(user?.skills || ["Event Planning","Teaching","Graphic Designing","Communication"]).map(
            (skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-[#004D7CFF] text-white"
              >
                {skill}
              </span>
            )
          )}
        </div>

        {/* Interests */}
        <div className="flex flex-wrap gap-2 mt-3">
          {(user?.interests || ["Community Outreach","Animal Welfare","Education","Environment"]).map(
            (tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-[#87CEFAFF] text-blue-700"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ===================== Stats ===================== */

function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        icon={Star}
        value="12"
        title="Recommended Damages"
        subtitle="New opportunities available"
      />
      <StatCard
        icon={Calendar}
        value="5"
        title="Upcoming Damages"
        subtitle="Scheduled events"
      />
      <StatCard
        icon={History}
        value="23"
        title="Participation History"
        subtitle="Total Events Participated"
      />
    </div>
  );
}

function StatCard({ icon: Icon, value, title, subtitle }) {
  return (
    <div className="w-full bg-white rounded-2xl p-6 mx-2 shadow-md flex items-start gap-4">
      <div className="p-1 rounded-xl bg-white text-[#4A90E2FF]">
        <Icon className="h-5 w-5" />
      </div>

      <div className="px-4 text-center">
        <h3 className="text-[18px] font-bold text-gray-900">{title}</h3>
        <p className="text-[48px] font-bold text-[#4A90E2FF]">{value}</p>
        <p className="text-[14px] text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
