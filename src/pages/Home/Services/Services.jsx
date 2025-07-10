import { useState } from "react";
import { FaTasks, FaMoneyCheckAlt, FaChartLine, FaUserShield } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const serviceData = [
  {
    id: 1,
    icon: <FaTasks className="text-5xl text-primary" aria-hidden="true" />,
    title: "Employee Task Logging",
    short: "Submit and track your daily tasks with worked hours and dates.",
    details:
      "Employees can log tasks like Sales, Content creation, or Support activities, specify worked hours and date-wise reports to keep everything transparent and organized for HR review.",
  },
  {
    id: 2,
    icon: <FaMoneyCheckAlt className="text-5xl text-primary" aria-hidden="true" />,
    title: "Salary & Payment Tracking",
    short: "Employees can view salary history. HR manages payroll seamlessly.",
    details:
      "HR executives can pay verified employees and track monthly payments. Employees can view their salary, transaction ID, and payment history anytime from their dashboard.",
  },
  {
    id: 3,
    icon: <FaChartLine className="text-5xl text-primary" aria-hidden="true" />,
    title: "Performance Monitoring",
    short: "HR can monitor work reports to assess employee productivity.",
    details:
      "Work submissions are used to generate reports and performance charts for each employee. This helps HR evaluate efficiency and manage team workload better.",
  },
  {
    id: 4,
    icon: <FaUserShield className="text-5xl text-primary" aria-hidden="true" />,
    title: "Role-based Access Control",
    short: "Secure login with different privileges for Admin, HR, and Employee.",
    details:
      "Role-based routes and access ensure that Admins, HRs, and Employees see only what they're authorized to. This makes the system secure and organized.",
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  // Close modal on ESC key press
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setSelectedService(null);
    }
  };

  return (
    <section
      aria-labelledby="services-heading"
      className="max-w-[1536px] mx-auto px-4 py-16"
    >
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Left Image */}
        <div className="lg:w-1/2 w-full">
          <img
            src="https://img.freepik.com/free-vector/team-goal-concept-illustration_114360-5049.jpg"
            alt="Team goal illustration representing company services"
            className="w-full rounded-lg shadow-md object-cover"
          />
        </div>

        {/* Right Services List */}
        <div className="lg:w-1/2 w-full">
          <h2
            id="services-heading"
            className="text-3xl font-bold text-primary mb-8"
          >
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {serviceData.map((service) => (
              <article
                key={service.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedService(service)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedService(service);
                  }
                }}
                tabIndex={0}
                aria-describedby={`service-desc-${service.id}`}
                role="button"
              >
                <div>{service.icon}</div>
                <h3 className="text-xl font-semibold mt-4">{service.title}</h3>
                <p
                  id={`service-desc-${service.id}`}
                  className="text-gray-600 mt-2 text-sm"
                >
                  {service.short}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(service);
                  }}
                  className="mt-3 text-secondary underline text-sm hover:text-primary focus:outline-none"
                >
                  Learn More
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-xl max-w-lg w-full p-6 relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              className="absolute top-3 right-3 text-2xl text-red-500 hover:text-red-700 focus:outline-none"
              aria-label="Close modal"
            >
              <MdClose />
            </button>
            <h3
              id="modal-title"
              className="text-2xl font-bold text-primary mb-4"
            >
              {selectedService.title}
            </h3>
            <p className="text-gray-700">{selectedService.details}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
