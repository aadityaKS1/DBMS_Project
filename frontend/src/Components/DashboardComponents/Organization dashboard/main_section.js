import React from "react";
import EventCard from "../dashboard_eventCard.js";

// Images
import img1 from "../../../Assets/img1.jfif";
import img2 from "../../../Assets/img2.jfif";
import img3 from "../../../Assets/img3.jfif";
import img4 from "../../../Assets/img4.jfif";
import img5 from "../../../Assets/img5.jfif";
import img6 from "../../../Assets/img6.jfif";
import img7 from "../../../Assets/img7.jfif";
import img11 from "../../../Assets/img11.jpg";
import img12 from "../../../Assets/img13.jpg";

// ---------------- DATA ----------------

const pastLeads = [
    {
        title: "Dharahara Reconstruction",
        organizer: "Green Earth Alliance",
        tags: ["Environment", "Community"],
        date: "Oct 26, 2024",
        time: "9:00 AM - 1:00 PM",
        location: "Central Park, NY",
        image: img1,
        actionText: "View Report",
    },
    {
        title: "Samsad Bhawan Paint",
        organizer: "Green Earth Alliance",
        tags: ["Environment", "Community"],
        date: "Oct 26, 2024",
        time: "9:00 AM - 1:00 PM",
        location: "Central Park, NY",
        image: img2,
        actionText: "View Report",
    },
    {
        title: "Bagmati Khola Cleaning Camp",
        organizer: "Green Earth Alliance",
        tags: ["Environment", "Community"],
        date: "Oct 26, 2024",
        time: "9:00 AM - 1:00 PM",
        location: "Central Park, NY",
        image: img3,
        actionText: "View Report",
    },
];

const ongoingLeads = [
    {
        title: "Community Reforestation Project",
        organizer: "Green Earth Alliance",
        tags: ["Environment", "Community"],
        date: "Oct 26, 2024",
        time: "9:00 AM - 1:00 PM",
        location: "Central Park, NY",
        image: img4,
        actionText: "See Progress",
    },
    {
        title: "Food Bank Sorting",
        organizer: "Green Earth Alliance",
        tags: ["Environment", "Community"],
        date: "Oct 26, 2024",
        time: "9:00 AM - 1:00 PM",
        location: "Central Park, NY",
        image: img5,
        actionText: "See Progress",
    },
    {
        title: "Singha Durbar Reconstruction",
        organizer: "Green Earth Alliance",
        tags: ["Environment", "Community"],
        date: "Oct 26, 2024",
        time: "9:00 AM - 1:00 PM",
        location: "Central Park, NY",
        image: img6,
        actionText: "See Progress",
    },
];

const pendingLeads = [
    {
        title: "Bagmati Khola Cleaning Camp",
        organizer: "Green Earth Alliance",
        tags: ["Environment", "Community"],
        date: "Oct 26, 2024",
        time: "9:00 AM - 1:00 PM",
        location: "Central Park, NY",
        image: img7,
        actionText: "Get Involved",
    },
    {
        title: "Bagmati Khola Cleaning Camp",
        organizer: "Green Earth Alliance",
        tags: ["Environment", "Community"],
        date: "Oct 26, 2024",
        time: "9:00 AM - 1:00 PM",
        location: "Central Park, NY",
        image: img11,
        actionText: "Get Involved",
    },
    {
        title: "Bagmati Khola Cleaning Camp",
        organizer: "Green Earth Alliance",
        tags: ["Environment", "Community"],
        date: "Oct 26, 2024",
        time: "9:00 AM - 1:00 PM",
        location: "Central Park, NY",
        image: img12,
        actionText: "Get Involved",
    },
];

// ---------------- COMPONENT ----------------

function MainSection() {
    return (
        <div className="bg-gray-100 px-8 py-6 space-y-10 font-bold">

            {/* Past Leads */}
            <Section title="Past Leads Preview" data={pastLeads} />

            {/* Ongoing Leads */}
            <Section title="Ongoing Leads" data={ongoingLeads} />

            {/* Pending Leads */}
            <Section title="Pending Leads" data={pendingLeads} />
        </div>
    );
}

// ---------------- REUSABLE SECTION ----------------

function Section({ title, data }) {
    return (
        <div className="w-fit mx-[254px] flex flex-col items-center justify-center mt-2">
            <div>
                <h2 className="text-xl font-semibold mb-6">{title}</h2>

                <div className="grid grid-cols-3 gap-72 font-semibold">
                    {data.map((item, index) => (
                        <EventCard key={index} event={item} />
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-10 mb-4 w-full">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 ml-52">
                    Show More
                </button>
            </div>
        </div>
    );
}

export default MainSection;
