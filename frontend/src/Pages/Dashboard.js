import React from "react";
import {
    Squares2X2Icon,
    CalendarIcon,
    StarIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    UserCircleIcon 
} from "@heroicons/react/24/outline";
import Navbar from "../Components/Navbar";
import profilevol from '../assets/profilevol.png'
// --- (StatCard, PastEventCard, and NavItem components remain the same) ---

// Utility component for the Navigation Link/Item
const NavItem = ({ icon: Icon, label, isActive = false }) => (
    <li className={`p-3 mx-4 rounded-lg cursor-pointer transition-colors flex items-center ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
        <Icon className="w-5 h-5 mr-3" />
        {label}
    </li>
);

// Utility component for the Stat Card
const StatCard = ({ icon: Icon, title, value, subtitle }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 text-gray-500 mb-2">
             <Icon className="w-6 h-6" />
             <p className="font-bold text-base text-gray-500 uppercase tracking-wider">{title}</p>
        </div>
        <div className="text-4xl font-extrabold text-blue-600">
            {value}
        </div>
        <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
);

// Utility component for the Past Event Preview Card
const PastEventCard = ({ title, org, tags, date, location }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
        {/* Placeholder image from original code */}
        <img
            src="/event.jpg"
            alt={title}
            className="w-full h-32 object-cover"
        />
        <div className="p-4 space-y-2">
            <h3 className="font-bold text-gray-800 text-base">{title}</h3>
            <p className="text-gray-500 text-sm">{org}</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                    <span key={tag} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {tag}
                    </span>
                ))}
            </div>
            <p className="text-gray-400 text-xs pt-1">{date}</p>
            <p className="text-gray-400 text-xs">{location}</p>
        </div>
    </div>
);
// --- (End of utility components) ---


function Dashboard() {
    const skills = ["Event Planning", "Teaching", "Graphic Designing", "Communication", "Community Outreach", "Animal Welfare", "Education", "Environment"];

    const eventStats = [
        { icon: StarIcon, title: "Recommended Events", value: "12", subtitle: "New opportunities available" },
        { icon: CalendarIcon, title: "Upcoming Events", value: "5", subtitle: "Scheduled events" },
        { icon: UserCircleIcon, title: "Participation History", value: "23", subtitle: "Total Events Participated" }
    ];

    const pastEvents = [
        { title: "Community Reforestation Project", org: "Green Earth Alliance", tags: ["Environment", "Community"], date: "Oct 26, 2024 | 9:00 AM - 1:00 PM", location: "Central Park, NY" },
        { title: "Food Bank Sorting", org: "Charity Group Inc.", tags: ["Community Outreach"], date: "Oct 19, 2024 | 10:00 AM - 2:00 PM", location: "Local Shelter" },
        { title: "Tech Membership Workshop", org: "The Tech Hub", tags: ["Education", "Teaching"], date: "Sep 20, 2024 | 6:00 PM - 8:00 PM", location: "Online" }
    ];


    return (
        <>
            {/* The Navbar component needs to be correctly imported and styled to match the image. */}
            {/* Assuming the imported 'Navbar' component handles the top bar styling. */}
            <Navbar />

            {/* Main Content Area: Sidebar + Dashboard Body */}
            <div className="flex flex-col md:flex-row mt-[68px] min-h-screen bg-gray-50"> 
                {/* Sidebar - w-64 is standard for tailwind, background, shadow and border match the image */}
                <aside className="w-full md:w-64 bg-white shadow-xl md:shadow-none md:border-r border-gray-200 flex flex-col pt-4">
                    
                    {/* Profile Section on Sidebar */}
                    <div className="flex flex-col items-center p-6 border-b border-gray-100">
                        {/* Profile Image (w-16 h-16) */}
                        <img
                            src={profilevol}
                            alt="Aaditya Singh Profile"
                            className="w-16 h-16 rounded-full mb-3 shadow-md"
                        />
                        <h2 className="font-bold text-lg text-gray-800">Aaditya Singh</h2>
                        <span className="text-blue-600 text-sm font-medium">Volunteer</span>
                    </div>

                    {/* Menu Navigation */}
                    <nav className="flex-1 mt-2 space-y-1">
                        <ul>
                            <NavItem icon={Squares2X2Icon} label="Dashboard" isActive={true} />
                            <NavItem icon={CalendarIcon} label="My Events" />
                            <NavItem icon={StarIcon} label="Recommended Events" />
                            <NavItem icon={Cog6ToothIcon} label="Settings" />
                            {/* Sign Out */}
                            <NavItem icon={ArrowRightOnRectangleIcon} label="Sign Out" />
                        </ul>
                    </nav>
                </aside>

                {/* Main Dashboard Content */}
                <main className="flex-1 p-8 space-y-8">

                    {/* NEW CONTAINER: User Card and Engagement Score */}
                    {/* This ensures the two main panels are side-by-side */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* 1. User Card (Left/Main Section) */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-xl p-8 space-y-4 border-t-4 border-blue-600">
                            <div className="flex items-center space-x-3">
                                <h1 className="text-3xl font-extrabold text-gray-900">Aaditya Singh</h1>
                                {/* Star Icon for "Volunteer" tag - matched to the image */}
                                <span className="flex items-center bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                    <StarIcon className="w-3 h-3 mr-1 fill-current" />
                                    Volunteer
                                </span>
                            </div>
                            
                            {/* Skills/Tags */}
                            <div className="flex flex-wrap gap-2 pt-1">
                                {skills.map(skill => (
                                    <span key={skill} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 2. Engagement Score (Right/Separate Card) */}
                        <div className="lg:col-span-1 bg-white rounded-xl shadow-xl p-8 flex flex-col items-center justify-center space-y-2 ">
                            <div className="flex items-center space-x-2 text-gray-500 text-sm font-medium">
                                <p className="text-lg font-bold text-gray-500 flex items-center">
                                    <span className="mr-2 text-blue-600">
                                        {/* Using an icon like a chart/line graph to represent 'Engagement' */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l6-6 6 6 6-6" />
                                        </svg>
                                    </span>
                                    Engagement Score
                                </p>
                            </div>
                            <p className="text-4xl font-bold text-blue-600 py-2">85<span className="text-4xl">/100</span></p>
                            
                            {/* Progress Bar (85%) */}
                            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                                <div className="h-2 bg-blue-600 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards (Recommended, Upcoming, History) */}
                    {/* These cards are now separate from the User/Score container, as in the image */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {eventStats.map(stat => (
                            <StatCard 
                                key={stat.title}
                                icon={stat.icon} 
                                title={stat.title} 
                                value={stat.value} 
                                subtitle={stat.subtitle} 
                            />
                        ))}
                    </div>

                    {/* Past Events Preview */}
                    <div className="pt-4">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Past Events Preview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {pastEvents.map(event => (
                                <PastEventCard 
                                    key={event.title}
                                    title={event.title} 
                                    org={event.org} 
                                    tags={event.tags} 
                                    date={event.date} 
                                    location={event.location}
                                />
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors">
                                Show More
                            </button>
                        </div>
                    </div>

                </main>
            </div>
        </>
    );
}

export default Dashboard;