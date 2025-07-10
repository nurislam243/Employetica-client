import { useState } from "react";
import { FaTasks, FaMoneyCheckAlt, FaChartLine, FaUserShield } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const serviceData = [
  {
    id: 1,
    icon: <FaTasks className="text-4xl text-primary" />,
    title: "Employee Task Logging",
    short: "Submit and track your daily tasks with worked hours and dates.",
    details:
      "Employees can log tasks like Sales, Content creation, or Support activities, specify worked hours and date-wise reports to keep everything transparent and organized for HR review.",
  },
  {
    id: 2,
    icon: <FaMoneyCheckAlt className="text-4xl text-primary" />,
    title: "Salary & Payment Tracking",
    short: "Employees can view salary history. HR manages payroll seamlessly.",
    details:
      "HR executives can pay verified employees and track monthly payments. Employees can view their salary, transaction ID, and payment history anytime from their dashboard.",
  },
  {
    id: 3,
    icon: <FaChartLine className="text-4xl text-primary" />,
    title: "Performance Monitoring",
    short: "HR can monitor work reports to assess employee productivity.",
    details:
      "Work submissions are used to generate reports and performance charts for each employee. This helps HR evaluate efficiency and manage team workload better.",
  },
  {
    id: 4,
    icon: <FaUserShield className="text-4xl text-primary" />,
    title: "Role-based Access Control",
    short: "Secure login with different privileges for Admin, HR, and Employee.",
    details:
      "Role-based routes and access ensure that Admins, HRs, and Employees see only what they're authorized to. This makes the system secure and organized.",
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className="max-w-[1536px] mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Left Image */}
        <div className="lg:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/team-goal-concept-illustration_114360-5049.jpg"
            alt="Services"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Right Services */}
        <div className="lg:w-1/2 w-full">
          <h2 className="text-3xl font-bold text-primary mb-6">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {serviceData.map((service) => (
              <div
                key={service.id}
                className="bg-base-100 border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition"
              >
                {service.icon}
                <h3 className="text-xl font-semibold mt-3">{service.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{service.short}</p>
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-secondary mt-3 underline text-sm hover:text-primary"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white max-w-lg w-full p-6 rounded-xl relative shadow-xl">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-2 right-2 text-2xl text-red-500 hover:text-red-700"
            >
              <MdClose />
            </button>
            <h3 className="text-2xl font-bold text-primary mb-2">
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
