import React from "react";
import {
    Squares2X2Icon,
    CalendarIcon,
    PlusCircleIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    UsersIcon,
    StarIcon
} from "@heroicons/react/24/outline";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// Sidebar Navigation Item
const NavItem = ({ icon: Icon, label, isActive = false }) => (
    <li className={`p-3 mx-4 rounded-lg cursor-pointer transition-colors flex items-center ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
        <Icon className="w-5 h-5 mr-3" />
        {label}
    </li>
);

// Stats Card
const OrganizationStatCard = ({ icon: Icon, title, value, subtitle }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 text-gray-500 mb-2">
            <Icon className="w-6 h-6" />
            <p className="font-medium text-sm text-gray-500 uppercase tracking-wider">{title}</p>
        </div>
        <div className="text-4xl font-extrabold text-blue-600">{value}</div>
        <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
);

// Past Event Card
const PastEventCard = ({ title, org, tags, date, location }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
        <img src="/event.jpg" alt={title} className="w-full h-40 object-cover" />
        <div className="p-4 space-y-2">
            <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
            <p className="text-gray-500 text-sm">{org}</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
                ))}
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">Volunteer Attendance</button>
            <p className="text-gray-400 text-xs pt-2">{date}</p>
            <p className="text-gray-400 text-xs">{location}</p>
        </div>
    </div>
);

// Upcoming Event Card
const UpcomingEventCard = ({ title, tags, volunteers, date, location }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
        <img src="/event.jpg" alt={title} className="w-full h-40 object-cover" />
        <div className="p-4 space-y-2">
            <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
                ))}
            </div>
            <p className="text-gray-700 font-semibold mt-3">Volunteers Required: <span className="text-blue-600">{volunteers}</span></p>
            <button className="w-full mt-2 bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-300 transition">See Registered Volunteers List</button>
            <p className="text-gray-400 text-xs pt-2">{date}</p>
            <p className="text-gray-400 text-xs">{location}</p>
        </div>
    </div>
);

function OrganizationDashboard() {
    const categories = ["Community", "Animal Welfare", "Education", "Environment"];

    const orgStats = [
        { icon: CalendarIcon, title: "Past Events", value: "12", subtitle: "Total Events Organized" },
        { icon: CalendarIcon, title: "Upcoming Events", value: "5", subtitle: "Scheduled events" },
        { icon: UsersIcon, title: "New Registrations", value: "23", subtitle: "Number of new volunteers" }
    ];

    const pastEvents = [
        { title: "Community Reforestation Project", org: "Green Earth Alliance", tags: ["Environment", "Community"], date: "Oct 26, 2024 | 9:00 AM - 1:00 PM", location: "Central Park, NY" },
        { title: "Food Bank Sorting", org: "Green Earth Alliance", tags: ["Environment", "Community"], date: "Oct 19, 2024 | 10:00 AM - 2:00 PM", location: "Local Shelter" },
        { title: "Tech Membership Workshop", org: "The Tech Hub", tags: ["Education", "Teaching"], date: "Sep 20, 2024 | 6:00 PM - 8:00 PM", location: "Online" }
    ];

    const upcomingEvents = [
        { title: "Community Reforestation Project", tags: ["Environment", "Community"], volunteers: "45", date: "Oct 26, 2024 | 9:00 AM - 1:00 PM", location: "Central Park, NY" },
        { title: "Food Bank Sorting", tags: ["Environment", "Community"], volunteers: "30", date: "Oct 19, 2024 | 10:00 AM - 2:00 PM", location: "Local Shelter" },
        { title: "Tech Membership Workshop", tags: ["Education", "Teaching"], volunteers: "50", date: "Sep 20, 2024 | 6:00 PM - 8:00 PM", location: "Online" }
    ];

    return (
        <>
            <Navbar />

            <div className="flex flex-col md:flex-row mt-[68px] min-h-screen bg-gray-50">
                {/* Sidebar */}
                <aside className="w-full md:w-64 bg-white shadow-xl md:shadow-none md:border-r border-gray-200 flex flex-col pt-4">
                    <div className="flex flex-col items-center p-6 border-b border-gray-100">
                        <img src="/organization-profile.jpg" alt="SOS HGS Profile" className="w-20 h-20 rounded-full mb-3 shadow-md" />
                        <h2 className="font-bold text-lg text-gray-800">SOS HGS</h2>
                        <span className="text-blue-600 text-sm font-medium">Organization</span>
                    </div>

                    <nav className="flex-1 mt-2 space-y-1">
                        <ul>
                            <NavItem icon={Squares2X2Icon} label="Dashboard" isActive />
                            <NavItem icon={CalendarIcon} label="My Events" />
                            <NavItem icon={PlusCircleIcon} label="Create Event" />
                            <NavItem icon={Cog6ToothIcon} label="Profile Setting" />
                            <NavItem icon={ArrowRightOnRectangleIcon} label="Sign Out" />
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 space-y-10">
                    {/* Organization Header */}
                    <div className="bg-white rounded-xl shadow-2xl p-8 space-y-4 border-t-4 border-blue-600">
                        <div className="flex items-center space-x-3">
                            <h1 className="text-3xl font-extrabold text-gray-900">SOS HGS</h1>
                            <span className="flex items-center bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                <StarIcon className="w-3 h-3 mr-1 fill-current" />
                                Organization
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {categories.map(category => (
                                <span key={category} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">{category}</span>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {orgStats.map(stat => (
                            <OrganizationStatCard key={stat.title} icon={stat.icon} title={stat.title} value={stat.value} subtitle={stat.subtitle} />
                        ))}
                    </div>

                    {/* Past Events */}
                    <div className="pt-4">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Past Events Preview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {pastEvents.map(event => (
                                <PastEventCard key={event.title} {...event} />
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <button className="text-blue-600 font-semibold py-3 px-6 hover:text-blue-800 transition">Show More</button>
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="pt-4">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Upcoming Events</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {upcomingEvents.map(event => (
                                <UpcomingEventCard key={event.title} {...event} />
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors">Show More</button>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </>
    );
}

export default OrganizationDashboard;
