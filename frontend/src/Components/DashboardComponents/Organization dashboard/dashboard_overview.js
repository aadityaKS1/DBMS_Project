import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, PlusSquare, LogOut } from "lucide-react";
import rotaract_logo from "../../../Assets/rotaract_logo.png";
import { AuthContext } from "../../AuthContext"; 

function Dashboard_overview() {
    return (
        <div className="flex bg-gray-100">
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8">
                <HeaderSection />
                <StatsSection />
            </div>
        </div>
    );
}

export default Dashboard_overview;

// ===== Sidebar =====
function Sidebar() {
    const { setUser } = useContext(AuthContext); // get setUser to reset context
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("user"); // remove user from localStorage
        setUser(null); // reset navbar state
        navigate("/"); // redirect to homepage
    };

    return (
        <aside className="w-64 h-full bg-white rounded-lg mt-3 shadow-md flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b">
                <div className="flex flex-col items-center text-center">
                    <div className="h-14 w-14 rounded-full mb-2">
                        <div className="h-14 w-full overflow-hidden">
                            <img
                                src={rotaract_logo}
                                alt="Event"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                    <h2 className="text-sm font-extrabold">RAC KTM</h2>
                    <p className="text-xs text-gray-500">Lead</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                <NavItem icon={LayoutDashboard} label="Dashboard" to="/club" />
                <NavItem icon={PlusSquare} label="Create Event" to="/Report" />
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

function NavItem({ icon: Icon, label, to }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-2 text-sm rounded-xl transition ${
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

// ===== Header Section =====
function HeaderSection() {
    return (
        <div className="bg-blue-50 rounded-2xl p-6 shadow-xl mb-6">
            <div className="flex items-center gap-3">
                <h1 className="text-[48px] leading-9 font-bold text-gray-900">
                    RAC KTM
                </h1>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white">
                    Lead
                </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
                {["Reconstruction", "Animal Welfare", "Education", "Environment"].map(
                    (tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium"
                        >
                            {tag}
                        </span>
                    )
                )}
            </div>
        </div>
    );
}

// ===== Stats Section =====
function StatsSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Past Leads" value="12" subtitle="Total Leads Done" />
            <StatCard title="Ongoing Leads" value="5" subtitle="Leads At Moment" />
            <StatCard title="Upcoming Leads" value="23" subtitle="New Leads On The Way" />
        </div>
    );
}

function StatCard({ title, value, subtitle }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-xl text-center">
            <h3 className="text-sm font-bold text-gray-900">{title}</h3>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">{value}</p>
            <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
        </div>
    );
}
