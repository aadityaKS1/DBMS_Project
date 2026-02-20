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

function Volunteer_dashboard({ pastEvents = [], ongoingEvents = [] }) {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 p-8">
                <HeaderSection />
                <StatsSection />
                <VolMainSection
                    pastEvents={pastEvents}
                    ongoingEvents={ongoingEvents}
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
        localStorage.removeItem("volunteer_id");
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
                    {user?.name || "Loading..."}
                </h2>
                <p className="text-xs text-gray-500">
                    {user?.role || "Volunteer"}
                </p>
            </div>

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
                `w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition ${isActive
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
   HEADER — FETCH VOLUNTEER
========================================================= */

function HeaderSection() {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const volunteerId = localStorage.getItem("volunteer_id");

        if (!volunteerId) {
            setError("No volunteer ID found");
            setLoading(false);
            return;
        }

        fetch("http://127.0.0.1:8000/api/volunteer_dashboard/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ volunteer_id: volunteerId }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) setError(data.error);
                else setUser(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load volunteer");
                setLoading(false);
            });
    }, [setUser]);

    if (loading) return <div className="mb-6">Loading dashboard...</div>;
    if (error) return <div className="text-red-500 mb-6">{error}</div>;

    return (
        <div className="relative bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#4A90E2FF] rounded-t-2xl" />

            <div className="relative">
                {/* Name + Role */}
                <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {user?.name}
                    </h1>

                    <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-[#4A90E2FF] text-white">
                        ★ Volunteer
                    </span>
                </div>

                {/* Email */}
                <p className="text-gray-600 mt-2">{user?.email}</p>

                {/* ⭐ Skills (RESTORED) */}
                {user?.skills && user.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {user.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 text-xs rounded-full bg-[#004D7CFF] text-white"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/* =========================================================
   EVENTS SECTION
========================================================= */

function VolMainSection({ pastEvents, ongoingEvents }) {
    return (
        <div className="px-2">
            <Section title="Past Damages Preview" events={pastEvents} />
            <Section title="Ongoing Damages" events={ongoingEvents} />
        </div>
    );
}

function Section({ title, events }) {
    return (
        <div className="max-w-6xl mx-auto mt-6">
            <h2 className="text-xl font-bold mb-6">{title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events?.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>

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

function StatsSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard icon={Star} value="12" title="Recommended Damages" />
            <StatCard icon={Calendar} value="5" title="Upcoming Damages" />
            <StatCard icon={History} value="23" title="Participation History" />
        </div>
    );
}

function StatCard({ icon: Icon, value, title }) {
    return (
        <div className="w-full bg-white rounded-2xl p-6 shadow-md flex items-start gap-4">
            <div className="p-1 rounded-xl text-[#4A90E2FF]">
                <Icon className="h-5 w-5" />
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                <p className="text-3xl font-bold text-[#4A90E2FF]">{value}</p>
            </div>
        </div>
    );
}
