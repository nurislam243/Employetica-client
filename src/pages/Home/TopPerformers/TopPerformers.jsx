import React from "react";

const performers = [
  {
    id: 1,
    name: "Nusrat Jahan",
    role: "Admin",
    achievement: "Successfully managed payroll for 500+ employees",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Sarah Rahman",
    role: "Software Engineer",
    achievement: "Consistently submitted tasks ahead of deadlines",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 3,
    name: "Jahidul Hasan",
    role: "Frontend Developer",
    achievement: "Top performer in UI/UX improvements for internal apps",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: 4,
    name: "Maya Akter",
    role: "Digital Marketer",
    achievement: "Improved internal communication campaigns by 30%",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 5,
    name: "Tanvir Ahmed",
    role: "HR Executive",
    achievement: "Streamlined employee verification & onboarding process",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

const TopPerformers = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-[1536px] mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-10 text-center">
          Top Performers
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {performers.map((person) => (
            <div
              key={person.id}
              className="card bg-base-200 shadow-md rounded border border-base-300 hover:shadow-xl transition duration-300"
            >
              <figure className="px-6 pt-6">
                <img
                  src={person.image}
                  alt={person.name}
                  className="rounded-full w-32 h-32 object-cover mx-auto"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="text-xl font-semibold text-primary">
                  {person.name}
                </h3>
                <p className="text-secondary mb-2">{person.role}</p>
                <p className="text-base-content text-sm">{person.achievement}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopPerformers;
