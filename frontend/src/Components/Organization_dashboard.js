import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut } from "lucide-react";

import avatar from "../Assets/profilevol.png";
import { AuthContext } from "./AuthContext";

/* =========================================================
   EVENT CARD
========================================================= */
function EventCard({
  event,
  mode = "view",
  onAccept,
  onViewApplicants,
  onAssign,
  onDelete,
  onEdit,
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async (cb) => {
    if (!cb) return;
    try {
      setLoading(true);
      await cb();
    } catch (e) {
      console.error("Action failed", e);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = () => {
    if (!onDelete) return;
    if (window.confirm("Delete this report?")) {
      handleClick(onDelete);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-base font-semibold text-gray-900">
          {event.infrastructure_type || "Damage Report"}
        </h3>

        {event.task_status && (
          <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
            {event.task_status}
          </span>
        )}
      </div>

      {/* Location */}
      <p className="text-sm text-gray-500 mt-1">
        📍 {event.district || "Location not specified"}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mt-4">
        {mode === "pending" && (
          <button
            onClick={() => handleClick(onAccept)}
            className="px-3 py-1.5 text-xs rounded-md bg-green-600 text-white"
          >
            Accept
          </button>
        )}

        {mode === "ongoing" && (
          <button
            onClick={() => handleClick(onViewApplicants)}
            className="px-3 py-1.5 text-xs rounded-md bg-blue-600 text-white"
          >
            Applicants
          </button>
        )}

        {mode === "applicant" && (
          <button
            onClick={() => handleClick(onAssign)}
            className="px-3 py-1.5 text-xs rounded-md bg-purple-600 text-white"
          >
            Assign
          </button>
        )}

        {onEdit && mode !== "applicant" && (
          <button
            onClick={() => handleClick(onEdit)}
            className="px-3 py-1.5 text-xs rounded-md bg-amber-500 text-white"
          >
            Edit
          </button>
        )}

        {onDelete && (
          <button
            onClick={confirmDelete}
            className="px-3 py-1.5 text-xs rounded-md bg-red-600 text-white"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN DASHBOARD
========================================================= */
function Organization_dashboard() {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const [editingEvent, setEditingEvent] = useState(null);
  const [editForm, setEditForm] = useState({
    infrastructure_type: "",
    district: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.id) fetchDashboard();
  }, [user?.id]);

  /* ================= FETCH ================= */
  const fetchDashboard = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/org_dashboard/${user.id}/`
      );
      const data = await res.json();

      setPendingEvents(data.pending || []);
      setOngoingEvents(data.ongoing || []);
      setCompletedEvents(data.completed || []);
    } catch (err) {
      console.error("Dashboard load failed", err);
    }
  };

  /* ================= ACCEPT ================= */
  const handleAccept = async (reportId) => {
    await fetch("http://127.0.0.1:8000/api/create_recovery_task/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        report_id: reportId,
        org_id: user?.id,
      }),
    });

    fetchDashboard();
  };

  /* ================= DELETE ================= */
  const handleDelete = async (reportId) => {
    await fetch("http://127.0.0.1:8000/api/delete-report/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ report_id: reportId }),
    });

    fetchDashboard();
  };

  /* ================= EDIT ================= */
  const handleEditOpen = (event) => {
    setEditingEvent(event);
    setEditForm({
      infrastructure_type: event.infrastructure_type || "",
      district: event.district || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    await fetch("http://127.0.0.1:8000/api/update-report/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        report_id: editingEvent.id,
        ...editForm,
      }),
    });

    setEditingEvent(null);
    fetchDashboard();
  };

  /* ================= VIEW APPLICANTS ================= */
  const handleViewApplicants = async (reportId) => {
    const res = await fetch(
      `http://127.0.0.1:8000/api/task_applicants/${reportId}/`
    );
    const data = await res.json();

    setApplicants(data || []);
    setSelectedReport(reportId);
  };

  /* ================= ASSIGN ================= */
  const handleAssign = async (volunteerId) => {
    if (!selectedReport) return;

    await fetch("http://127.0.0.1:8000/api/assign_volunteer/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        report_id: selectedReport,
        volunteer_id: volunteerId,
      }),
    });

    setApplicants([]);
    setSelectedReport(null);
    fetchDashboard();
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <HeaderSection />

        <OrgMainSection
          pendingEvents={pendingEvents}
          ongoingEvents={ongoingEvents}
          completedEvents={completedEvents}
          onAccept={handleAccept}
          onViewApplicants={handleViewApplicants}
          onDelete={handleDelete}
          onEdit={handleEditOpen}
        />

        {/* ⭐⭐⭐ THIS WAS MISSING — VERY IMPORTANT */}
        {applicants.length > 0 && (
          <ApplicantsPanel
            applicants={applicants}
            onAssign={handleAssign}
          />
        )}

        {/* EDIT MODAL */}
        {editingEvent && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-96 shadow-xl">
              <h2 className="text-xl font-bold mb-4">
                Edit Damage Report
              </h2>

              <input
                name="infrastructure_type"
                value={editForm.infrastructure_type}
                onChange={handleEditChange}
                className="w-full border rounded-lg p-2 mb-3"
              />

              <input
                name="district"
                value={editForm.district}
                onChange={handleEditChange}
                className="w-full border rounded-lg p-2 mb-4"
              />

              <div className="flex gap-2">
                <button
                  onClick={handleEditSave}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingEvent(null)}
                  className="flex-1 bg-gray-300 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Organization_dashboard;

/* =========================================================
   APPLICANTS PANEL (🔥 NEW)
========================================================= */
function ApplicantsPanel({ applicants, onAssign }) {
    return (
        <div className="mt-10 bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-6">
                👥 Applicants ({applicants.length})
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {applicants.map((a) => (
                    <EventCard
                        key={a.volunteer_id}
                        event={{
                            infrastructure_type: a.name,
                            district: a.skill,
                        }}
                        mode="applicant"
                        onAssign={() => onAssign(a.volunteer_id)}
                    />
                ))}
            </div>
        </div>
    );
}
/* =========================================================
   SIDEBAR + HEADER + STATS (unchanged but clean)
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
                <img src={avatar} className="h-16 w-16 rounded-full mb-3" />
                <h2 className="text-sm font-bold">{user?.name}</h2>
                <p className="text-xs text-gray-500">Organization</p>
            </div>

            <nav className="mt-6 space-y-2 flex-1">
                <NavItem to="/club" icon={LayoutDashboard} label="Dashboard" />

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
                `w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm ${isActive
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

function HeaderSection() {
    const { user } = useContext(AuthContext);
    return (
        <div className="bg-blue-50 rounded-2xl p-6 mb-8">
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-gray-600">{user?.email}</p>
        </div>
    );
}

function StatsSection({ pending, ongoing, completed }) {
    return (
        <div className="grid grid-cols-3 gap-6 mb-8">
            <StatCard value={pending} title="Pending" />
            <StatCard value={ongoing} title="Ongoing" />
            <StatCard value={completed} title="Completed" />
        </div>
    );
}

function StatCard({ value, title }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-3xl font-bold text-[#4A90E2FF]">{value}</p>
        </div>
    );
}

function OrgMainSection({
    pendingEvents,
    ongoingEvents,
    completedEvents,
    onAccept,
    onViewApplicants,
    onDelete,
    onEdit,
}) {
    return (
        <div className="px-2">
            <Section
                title="Pending Damages"
                events={pendingEvents}
                renderItem={(event) => (
                    <EventCard
                        event={event}
                        mode="pending"
                        onAccept={() => onAccept(event.id)}
                        onDelete={() => onDelete(event.id)}
                        onEdit={() => onEdit(event)}   // ⭐ IMPORTANT

                    />
                )}
            />
            <Section
                title="Ongoing Tasks"
                events={ongoingEvents}
                renderItem={(event) => (
                    <EventCard
                        event={event}
                        mode="ongoing"
                        onViewApplicants={() => onViewApplicants(event.id)}
                        onDelete={() => onDelete(event.id)}
                        onEdit={() => onEdit(event)}   // ⭐ IMPORTANT


                    />
                )}
            />
            <Section
                title="Completed Tasks"
                events={completedEvents}
                renderItem={(event) => (
                    <EventCard event={event} mode="view"
                        onDelete={() => onDelete(event.id)}
                        onEdit={() => onEdit(event)}   // ⭐ IMPORTANT

                    />
                )}
            />
        </div>
    );
}

function Section({ title, events, renderItem }) {
    return (
        <div className="max-w-6xl mx-auto mt-8">
            <h2 className="text-xl font-bold mb-6">{title}</h2>

            {events?.length === 0 ? (
                <p className="text-gray-500">No data found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event.id || event.task_id}>
                            {renderItem(event)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}