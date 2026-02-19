import React from "react";
import EventCard from "../dashboard_eventCard.js";

// Images
import img1 from "../../../Assets/img1.jfif";
import img2 from "../../../Assets/img2.jfif";
import img3 from "../../../Assets/img3.jfif";
import img4 from "../../../Assets/img4.jfif";
import img5 from "../../../Assets/img5.jfif";
import img6 from "../../../Assets/img6.jfif";

// ---------------- DATA ----------------

const pastEvents = [
  {
    title: "Parliament Building Damage",
    date: "Dec 25, 2025",
    location: "Kathmandu",
    description:
      "Parliament building partially damaged during Gen Z protest. Immediate restoration needed.",
    image: img1,
    priority: "Critical",
    skillsRequired: ["Engineer", "Architect"],
    progress: 20,
    aiBadge: "High Impact",
  },
  {
    title: "Factory Damage",
    date: "Dec 26, 2025",
    location: "Lalitpur",
    description:
      "Local factory affected by protest-related vandalism. Repairs required urgently.",
    image: img2,
    priority: "Ongoing",
    skillsRequired: ["Mason", "Labor"],
    progress: 40,
    aiBadge: "Top Priority",
  },
  {
    title: "Supreme Court Damage",
    date: "Dec 27, 2025",
    location: "Kathmandu",
    description:
      "Supreme Court premises damaged during demonstrations. Security and repair measures needed.",
    image: img3,
    priority: "Critical",
    skillsRequired: ["Engineer", "Security"],
    progress: 10,
    aiBadge: "High Impact",
  },
  
];

const ongoingEvents = [
  {
    title: "Supreme Court Damage",
    date: "Dec 27, 2025",
    location: "Kathmandu",
    description:
      "Supreme Court premises damaged during demonstrations. Security and repair measures needed.",
    image: img5,
    priority: "Critical",
    skillsRequired: ["Engineer", "Security"],
    progress: 10,
    aiBadge: "High Impact",
  },
  {
    title: "Bhatbhate Area Damage",
    date: "Dec 28, 2025",
    location: "Kathmandu",
    description:
      "Bhatbhate area infrastructure damaged amidst Gen Z protest rallies.",
    image: img6,
    priority: "Community",
    skillsRequired: ["General Labor", "Mason"],
    progress: 5,
    aiBadge: "Medium Impact",
  },
];

// ---------------- COMPONENT ----------------

function VolMainSection() {
  return (
    <div className="px-8 font-bold ">

      {/* Past Damages */}
      <Section title="Past Damages Preview" events={pastEvents} />

      {/* Ongoing Damages */}
      <Section title="Ongoing Damages" events={ongoingEvents} />

    </div>
  );
}

// ---------------- REUSABLE SECTION ----------------

function Section({ title, events }) {
  return (
    <div className="w-fit mx-[254px] flex flex-col items-center justify-center mt-2">
      <h2 className="text-xl font-bold mb-6 self-start ml-2">{title}</h2>

      <div className="grid grid-cols-3 gap-72 font-semibold">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>

      {/* Show More Button at bottom center */}
      <div className="flex justify-center mt-10 mb-4 w-full">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 ml-52">
          Show More
        </button>
      </div>
    </div>
  );
}

export default VolMainSection;
