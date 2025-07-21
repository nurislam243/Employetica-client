import { useState } from "react";
import {
  FaTasks,
  FaMoneyCheckAlt,
  FaChartLine,
  FaUserShield,
  FaClock,
  FaUsers,
  FaFileSignature,
  FaRegComments,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Employee Task Logging",
    icon: <FaTasks />,
    short: "Track and submit daily work activities effortlessly.",
    details:
      "Employees can log their daily work, choose task types, input hours worked, and submit updates. Everything is date-specific and managed for HR review.",
    image:
      "https://images.unsplash.com/photo-1584697964403-ec20b2372150?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Salary & Payment Tracking",
    icon: <FaMoneyCheckAlt />,
    short: "Seamless monthly payroll and salary history view.",
    details:
      "HR can verify and pay employees, and each payment is saved with transaction details. Employees can view their monthly salary history anytime.",
    image:
      "https://images.unsplash.com/photo-1588776814546-96f263b8a909?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Performance Monitoring",
    icon: <FaChartLine />,
    short: "Analyze employee efficiency with visual charts.",
    details:
      "HR can analyze submitted tasks and hours via bar charts to identify top performers and optimize workload distribution.",
    image:
      "https://images.unsplash.com/photo-1522202195461-61e6b8e432d1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Role-based Access",
    icon: <FaUserShield />,
    short: "Admin, HR, and Employee – separate route controls.",
    details:
      "Our system grants dashboard features based on user roles. Admins manage roles and control access. HR oversees employees. Employees focus on workflow updates.",
    image:
      "https://images.unsplash.com/photo-1600267165383-54bd7035f61c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Time Management Reports",
    icon: <FaClock />,
    short: "Track working hours per task with summaries.",
    details:
      "Detailed work hour analytics per employee are available to assess time distribution and productivity across departments or task categories.",
    image:
      "https://images.unsplash.com/photo-1559757175-5700dde67548?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "HR & Admin Controls",
    icon: <FaUsers />,
    short: "Verify employees, promote HR, fire users securely.",
    details:
      "HR and Admin can change user status and control employment access, including toggling verified status, assigning roles, and blocking fired users.",
    image:
      "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Contract & Salary Adjustment",
    icon: <FaFileSignature />,
    short: "Admin can securely adjust salaries, no decreases allowed.",
    details:
      "Admins can raise salaries of HRs or Employees as needed. The system prevents accidental or malicious salary reductions for security.",
    image:
      "https://images.unsplash.com/photo-1508387022272-8b648bdc3ffb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Contact & Feedback",
    icon: <FaRegComments />,
    short: "Visitors can send messages. Admins review feedback.",
    details:
      "An easy-to-use contact form allows anyone to send inquiries or suggestions. Admin can view all submitted messages through the dashboard.",
    image:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80",
  },
];

const Services = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <section className="max-w-[1536px] mx-auto py-16" id="services">
      <h2 className="text-3xl font-bold text-center text-primary mb-12">
        Our Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="relative bg-white rounded-xl shadow-md overflow-hidden border group"
          >
            {/* Image Section with overlay */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white rounded-full p-2 shadow">
                <div className="text-2xl text-primary">{service.icon}</div>
              </div>

              {/* Overlay for details */}
              <div
                className={`absolute top-0 left-0 w-full h-full text-white p-4 flex flex-col justify-center bg-black/70 transition-all duration-500 ease-in-out transform ${
                  expanded === service.id
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm">{service.details}</p>
              </div>
            </div>

            {/* Bottom content with toggle button */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.short}</p>
              <button
                onClick={() => toggleExpand(service.id)}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                {expanded === service.id ? "Close" : "Learn More"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
