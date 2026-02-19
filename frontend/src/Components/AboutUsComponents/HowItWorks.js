import React from 'react'
import ReportImg from '../../Assets/img21.jpeg'
import AIPrioritizeImg from '../../Assets/img22.jfif'
import AssignSkillsImg from '../../Assets/img23.jpg'
import TrackProgressImg from '../../Assets/img24.webp'
import { NavLink } from "react-router-dom";


// Reusable Card Component
const WorkCard = ({ image, title, description }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md border-l-4 border-blue-500 p-6 text-left">
            <div className="mb-4">
                <img src={image} alt={title} className="rounded-lg" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

const HowItWorks = () => {
    const steps = [
        {
            image: ReportImg,
            title: "Report",
            description:
                "Citizens and authorities submit GPS-tagged reports with photos and details of damaged public infrastructure.",
        },
        {
            image: AIPrioritizeImg,
            title: "AI Prioritize",
            description:
                "AI analyzes severity, urgency, and impact to prioritize reconstruction tasks transparently and efficiently.",
        },
        {
            image: AssignSkillsImg,
            title: "Assign Skills",
            description:
                "Skilled volunteers are matched to tasks based on expertise, location, and availability.",
        },
        {
            image: TrackProgressImg,
            title: "Track Progress",
            description:
                "Real-time dashboards track progress, accountability, and completion with community-verified updates.",
        },
    ];

    return (
        <section className="w-[90%] bg-[#e9edf2] py-8 mb-12 mt-6 rounded-xl mx-auto">
            <div className="max-w-7xl mx-auto px-4 text-center">
                {/* Heading */}
                <h2 className="text-4xl font-bold text-[#004d7c] mb-4">How It Works</h2>

                <p className="max-w-3xl mx-auto text-[#004d7c] text-lg mb-4">
                    पुनर्निर्माण is an AI-powered platform that coordinates damage reporting,
                    skilled volunteers, and resources to enable faster, transparent, and
                    resilient post-crisis recovery.
                </p>

                <p className="font-bold text-[#004d7c] mb-14">
                    Report → AI Prioritize → Assign Skills → Track Progress
                </p>

                {/* Cards */}
                <div className="grid grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <WorkCard
                            key={index}
                            image={step.image}
                            title={step.title}
                            description={step.description}
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16">
                    <NavLink to="/signup">
    <button className="inline-flex items-center gap-2 bg-[#004d7c] hover:bg-[#004d7c] text-white font-semibold px-8 py-3 rounded-full transition">
        Start Your Journey
        <span>→</span>
    </button>
</NavLink>

                    <p className="text-gray-500 text-sm mt-4">
                        Join our community of changemakers today. It's free and easy to get
                        started.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
