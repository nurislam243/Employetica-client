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
      "https://i.ibb.co/Sw08ps6f/man-using-external-storage-used-2-1.webp",
  },
  {
    id: 2,
    title: "Salary & Payment Tracking",
    icon: <FaMoneyCheckAlt />,
    short: "Seamless monthly payroll and salary history view.",
    details:
      "HR can verify and pay employees, and each payment is saved with transaction details. Employees can view their monthly salary history anytime.",
    image:
      "https://i.ibb.co/BVFJjv86/pexels-tima-miroshnichenko-6693655-1.webp",
  },
  {
    id: 3,
    title: "Performance Monitoring",
    icon: <FaChartLine />,
    short: "Analyze employee efficiency with visual charts.",
    details:
      "HR can analyze submitted tasks and hours via bar charts to identify top performers and optimize workload distribution.",
    image:
      "https://i.ibb.co/mrsdQRZ8/analyzing-business-chart-1.webp",
  },
  {
    id: 4,
    title: "Role-based Access",
    icon: <FaUserShield />,
    short: "Admin, HR, and Employee – separate route controls.",
    details:
      "Our system grants dashboard features based on user roles. Admins manage roles and control access. HR oversees employees. Employees focus on workflow updates.",
    image:
      "https://i.ibb.co/ZR8zz2vT/colleagues-working-together-call-center-office-1.webp",
  },
  {
    id: 5,
    title: "Time Management Reports",
    icon: <FaClock />,
    short: "Track working hours per task with summaries.",
    details:
      "Detailed work hour analytics per employee are available to assess time distribution and productivity across departments or task categories.",
    image:
      "https://i.ibb.co/C3LsSqcv/schedule-planner-task-agenda-checklist-concept-min.webp",
  },
  {
    id: 6,
    title: "HR & Admin Controls",
    icon: <FaUsers />,
    short: "Verify employees, promote HR, fire users securely.",
    details:
      "HR and Admin can change user status and control employment access, including toggling verified status, assigning roles, and blocking fired users.",
    image:
      "https://i.ibb.co/jvt6B8vm/tv-game-show-with-two-participants-answering-questions-solving-puzzles-host-smiling-women-participat.webp",
  },
  {
    id: 7,
    title: "Contract & Salary Adjustment",
    icon: <FaFileSignature />,
    short: "Admin can securely adjust salaries, no decreases allowed.",
    details:
      "Admins can raise salaries of HRs or Employees as needed. The system prevents accidental or malicious salary reductions for security.",
    image:
      "https://i.ibb.co/VprdYSsw/handsome-businessman-white-shirt-holding-folder-with-cash-looking-aside-with-pensive-expression-sitt.webp",
  },
  {
    id: 8,
    title: "Contact & Feedback",
    icon: <FaRegComments />,
    short: "Visitors can send messages. Admins review feedback.",
    details:
      "An easy-to-use contact form allows anyone to send inquiries or suggestions. Admin can view all submitted messages through the dashboard.",
    image:
      "https://i.ibb.co/CKy5FtzH/pexels-tima-miroshnichenko-5439436-min.webp",
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="relative bg-base-200/70 hover:bg-base-300/80 rounded shadow-md overflow-hidden border border-base-content/20 group"
          >
            {/* Image Section with overlay */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/80 border-3 border-primary rounded-full p-2 shadow">
                <div className="text-2xl text-primary">{service.icon}</div>
              </div>

              {/* Overlay for details */}
              <div
                className={`absolute top-0 left-0 w-full h-full text-white p-4 flex flex-col justify-center bg-black/85 transition-all duration-500 ease-in-out transform ${
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
              <p className="text-sm text-base-content/80">{service.short}</p>
              <button
                onClick={() => toggleExpand(service.id)}
                className="mt-2 font-medium text-primary hover:text-secondary cursor-pointer"
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
