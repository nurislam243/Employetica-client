import React from "react";
import { FaTrophy, FaUsers, FaProjectDiagram, FaClock } from "react-icons/fa";

const achievementsData = [
  {
    icon: <FaUsers className="w-10 h-10" />,
    title: "500+ Employees Managed",
    description: "Efficiently managing a large workforce with seamless workflow tracking.",
  },
  {
    icon: <FaProjectDiagram className="w-10 h-10" />,
    title: "1000+ Projects Completed",
    description: "Successfully delivered diverse projects across multiple departments.",
  },
  {
    icon: <FaClock className="w-10 h-10" />,
    title: "5 Years of Excellence",
    description: "Providing reliable employee management solutions for over 5 years.",
  },
  {
    icon: <FaTrophy className="w-10 h-10" />,
    title: "Awarded Best HR Solution",
    description: "Recognized as a top HR management platform by industry experts.",
  },
];

const CompanyAchievements = () => {
  return (
    <section className="max-w-[1536px] mx-auto py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-10 text-center">
        Company Achievements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {achievementsData.map(({ icon, title, description }, index) => (
          <div
            key={index}
            className="bg-base-200/70 hover:bg-base-300 rounded shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-4 text-primary">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-base-content/90 text-sm">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanyAchievements;
