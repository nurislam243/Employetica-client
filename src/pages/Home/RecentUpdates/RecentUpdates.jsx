import React, { useState } from "react";

const updates = [
  {
    id: 1,
    title: "July Payroll Completed",
    date: "Aug 10, 2025",
    description:
      "HR has successfully processed the July payroll for all employees. You can now view your salary slips in the dashboard. Ensure all your details are updated to avoid delays."
  },
  {
    id: 2,
    title: "Task Management System Update",
    date: "Aug 5, 2025",
    description:
      "New feature: Employees can categorize tasks by project and priority level, making performance tracking faster and easier. Managers can now assign tasks more efficiently."
  },
  {
    id: 3,
    title: "Company Townhall Announcement",
    date: "Aug 1, 2025",
    description:
      "Join us on Aug 15th for the company-wide townhall meeting to discuss Q3 achievements and upcoming projects. Attendance is mandatory for all employees."
  },
  {
    id: 4,
    title: "New Employee Onboarding Completed",
    date: "Jul 28, 2025",
    description:
      "Four new team members successfully joined our company. Welcome them aboard! They have been assigned mentors for a smooth onboarding process."
  },
  {
    id: 5,
    title: "Performance Review Scheduled",
    date: "Jul 25, 2025",
    description:
      "Annual performance reviews will start on Aug 20th. Employees will receive invites for one-on-one sessions with their managers."
  },
  {
    id: 6,
    title: "HR Policy Updated",
    date: "Jul 20, 2025",
    description:
      "The HR policies regarding leaves and remote work have been updated. Please review the changes in the HR dashboard to stay informed."
  },
];

const RecentUpdates = () => {
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  return (
    <section className="py-16">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-primary mb-10 text-center">
          Recent Updates
        </h2>

        <div className="overflow-x-auto">
          <table className="table w-full border border-base-300">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-left">Date</th>
                <th className="text-left">Title</th>
                <th className="text-left hidden lg:table-cell">Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {updates.map((update, index) => (
                <tr
                  key={update.id}
                  className={index % 2 === 0 ? "bg-base-100" : "bg-base-200"}
                >
                  <td>{update.date}</td>
                  <td>{update.title}</td>
                  <td className="hidden lg:table-cell line-clamp-2">
                    {update.description.slice(0, 70)} ...
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedUpdate(update)}
                    >
                      Read More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {selectedUpdate && (
          <div className="modal modal-open">
            <div className="modal-box max-w-lg">
              <h3 className="font-bold text-xl text-primary mb-3">
                {selectedUpdate.title}
              </h3>
              <p className="text-sm text-secondary mb-5">{selectedUpdate.date}</p>
              <p className="text-base-content mb-5">{selectedUpdate.description}</p>
              <div className="modal-action">
                <button
                  className="btn btn-outline btn-primary"
                  onClick={() => setSelectedUpdate(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentUpdates;
