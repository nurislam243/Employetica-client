const services = [
  {
    title: "Employee Task Logging",
    description: "Easily submit and track your daily tasks with worked hours and dates.",
    icon: "🗂️",
  },
  {
    title: "Salary & Payment Tracking",
    description: "Employees can view their salary history and HR can manage payroll.",
    icon: "💳",
  },
  {
    title: "Performance Monitoring",
    description: "HR can monitor productivity based on submitted work reports.",
    icon: "📊",
  },
  {
    title: "Role-based Access Control",
    description: "Secure login for Admin, HR, and Employees with custom privileges.",
    icon: "🔐",
  },
];

const Services = () => {
    return (
        <section className="py-10 px-4 bg-base-100 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
            <div key={index} className="p-6 border rounded-lg shadow-md hover:shadow-xl">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-sm mt-2 text-gray-600">{service.description}</p>
            </div>
            ))}
        </div>
        </section>
    );
};

export default Services;