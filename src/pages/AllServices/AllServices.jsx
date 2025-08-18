import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  FaTasks,
  FaMoneyCheckAlt,
  FaChartLine,
  FaUserShield,
  FaClock,
  FaUsers,
  FaFileSignature,
  FaRegComments,
  FaFileInvoiceDollar,
  FaUserPlus,
  FaSearch,
  FaCalendarAlt,
  FaRegClock,
  FaChalkboardTeacher,
  FaGift,
  FaPlaneDeparture
} from "react-icons/fa";

// Title wise icon map
const iconMap = {
  "Employee Task Logging": <FaTasks />,
  "Salary & Payment Tracking": <FaMoneyCheckAlt />,
  "Performance Monitoring": <FaChartLine />,
  "Role-based Access": <FaUserShield />,
  "Time Management Reports": <FaClock />,
  "HR & Admin Controls": <FaUsers />,
  "Contract & Salary Adjustment": <FaFileSignature />,
  "Contact & Feedback": <FaRegComments />,
  "Payroll Management": <FaFileInvoiceDollar />,
  "Employee Onboarding": <FaUserPlus />,
  "Recruitment Automation": <FaSearch />,
  "Shift Scheduling": <FaCalendarAlt />,
  "Time & Attendance": <FaRegClock />,
  "Training & Development": <FaChalkboardTeacher />,
  "Employee Benefits Management": <FaGift />,
  "Leave Management": <FaPlaneDeparture />
};

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [sortOrder, setSortOrder] = useState("Default"); // Default sorting
  const [filterRole, setFilterRole] = useState("All"); // Default no filter

  useEffect(() => {
    fetch("/data/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // Filter by role
  const filteredServices =
    filterRole === "All"
      ? services
      : services.filter((s) => s.role === filterRole);

  // Sort by title or keep original order
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortOrder === "A-Z") return a.title.localeCompare(b.title);
    if (sortOrder === "Z-A") return b.title.localeCompare(a.title);
    return 0; // Default: original order
  });

  return (
    <section className="max-w-[1536px] mx-auto py-16" id="all-services">
      <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6 text-center">
        All Services
      </h2>

      {/* Sorting & Filtering */}
      <div className="flex flex-col sm:flex-row items-center mb-6 gap-4 px-4">
        {/* Sort */}
        <div>
          <label className="font-medium mr-2">Sort:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="Default">Default</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>

        {/* Filter */}
        <div>
          <label className="font-medium mr-2">Filter by Role:</label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Admin">Admin</option>
            <option value="HR">HR</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {sortedServices.map((service) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
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
                <div className="text-2xl text-primary">
                  {iconMap[service.title]}
                </div>
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
                <p className="mt-2 text-sm font-medium">Role: {service.role}</p>
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
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AllServices;
