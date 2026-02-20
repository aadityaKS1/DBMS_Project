import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Star,
  History,
  LogOut,
} from "lucide-react";

import EventCard from "./EventCard";
import avatar from "../Assets/profilevol.png";
import { AuthContext } from "./AuthContext";

/* =========================================================
   MAIN DASHBOARD
========================================================= */

function Volunteer_dashboard() {
  const [recommended, setRecommended] = useState([]);
  const [others, setOthers] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);

  const { user } = useContext(AuthContext);

  // ✅ SAFE volunteer id
  const volunteerId =
    user?.volunteer_id || JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    if (volunteerId) {
      fetchRecommendations();
      fetchAssignedTasks();
    }
    // eslint-disable-next-line
  }, [volunteerId]);

  /* ===============================
     FETCH RECOMMENDATIONS
  =============================== */
  const fetchRecommendations = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/recommend_damages/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ volunteer_id: volunteerId }),
        }
      );

      const data = await res.json();

      const mapEvent = (item) => ({
        id: item.id,
        title: item.infrastructure_type || "Damage Report",
        location: item.district || "Unknown",
        date: item.created_at?.slice(0, 10) || "Recent",
        description: `Volunteers needed: ${
          item.volunteers_required ?? 0
        }`,
        status: item.task_status || "pending",
        applied: item.applied || false, // 🔥 important for UI
      });

      setRecommended((data.recommended || []).map(mapEvent));
      setOthers((data.other || data.others || []).map(mapEvent));
    } catch (err) {
      console.error("Recommendation fetch failed", err);
    }
  };

  /* ===============================
     FETCH ASSIGNED TASKS
  =============================== */
  const fetchAssignedTasks = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/volunteer_tasks/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ volunteer_id: volunteerId }),
        }
      );

      const data = await res.json();

      const mapped = (data || []).map((item) => ({
        id: item.id,
        title: item.infrastructure_type,
        location: item.district,
        date: item.created_at?.slice(0, 10),
        description: "Assigned by organization",
        status: item.task_status,
      }));

      setAssignedTasks(mapped);
    } catch (err) {
      console.error("Assigned tasks fetch failed", err);
    }
  };

  /* ===============================
     APPLY TO TASK
  =============================== */
  const handleApply = async (reportId) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/apply_task/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            report_id: reportId,
            volunteer_id: volunteerId,
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      alert("Application sent successfully");

      fetchRecommendations();
    } catch (err) {
      console.error("Apply failed", err);
    }
  };

  /* ===============================
     WITHDRAW APPLICATION
  =============================== */
  const handleWithdraw = async (reportId) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/delete_application/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            report_id: reportId,
            volunteer_id: volunteerId,
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      alert("Application withdrawn");

      fetchRecommendations();
      fetchAssignedTasks();
    } catch (err) {
      console.error("Withdraw failed", err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <HeaderSection />
        <StatsSection assignedCount={assignedTasks.length} />

        <VolSection
          title="⭐ Recommended Damages"
          events={recommended}
          onApply={handleApply}
          onWithdraw={handleWithdraw}
        />

        <VolSection
          title="📦 Other Damages"
          events={others}
          onApply={handleApply}
          onWithdraw={handleWithdraw}
        />

        <VolSection
          title="🛠 My Assigned Tasks"
          events={assignedTasks}
        />
      </div>
    </div>
  );
}

export default Volunteer_dashboard;

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
        <h2 className="text-sm font-bold">{user?.name || "Volunteer"}</h2>
        <p className="text-xs text-gray-500">Volunteer</p>
      </div>

      <nav className="mt-6 space-y-2 flex-1">
        <NavItem to="/volunteer" icon={LayoutDashboard} label="Dashboard" />

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
    <div className="relative bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
      <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
      <p className="text-gray-600 mt-2">{user?.email}</p>

      {user?.skills?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {user.skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-[#004D7CFF] text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SECTION
========================================================= */

function VolSection({ title, events, onApply, onWithdraw }) {
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-6">{title}</h2>

      {events?.length === 0 ? (
        <p className="text-gray-500">No data found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onApply={onApply ? () => onApply(event.id) : undefined}
              onWithdraw={
                onWithdraw ? () => onWithdraw(event.id) : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   STATS
========================================================= */

function StatsSection({ assignedCount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard icon={Star} value={assignedCount} title="Assigned Tasks" />
      <StatCard icon={Calendar} value="—" title="Upcoming" />
      <StatCard icon={History} value="—" title="History" />
    </div>
  );
}

function StatCard({ icon: Icon, value, title }) {
  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-md flex items-start gap-4">
      <Icon className="h-5 w-5 text-[#4A90E2FF]" />
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <p className="text-3xl font-bold text-[#4A90E2FF]">{value}</p>
      </div>
    </div>
  );
}