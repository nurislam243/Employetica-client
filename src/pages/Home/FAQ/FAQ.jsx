import React, { useState } from "react";
import {
  FaRegSmile,
  FaFileInvoice,
  FaExclamationCircle,
  FaCreditCard,
  FaEnvelope,
  FaQuestionCircle,
  FaVideo,
  FaCogs,
  FaUserShield,
  FaMoneyCheck,
} from "react-icons/fa";

const faqs = [
  {
    id: 1,
    icon: <FaUserShield className="text-primary w-6 h-6" />,
    question: "How do I add a new employee?",
    answer:
      "Navigate to the 'Employees' section, click on 'Add Employee', fill in the required details, and save the record.",
  },
  {
    id: 2,
    icon: <FaFileInvoice className="text-primary w-6 h-6" />,
    question: "Can I generate employee salary slips?",
    answer:
      "Yes! Go to the 'Payroll' tab, select an employee or multiple employees, and generate salary slips in PDF format.",
  },
  {
    id: 3,
    icon: <FaCreditCard className="text-primary w-6 h-6" />,
    question: "How is salary payment handled?",
    answer:
      "Salaries can be paid directly via Stripe or bank transfer. You can schedule monthly payments automatically.",
  },
  {
    id: 4,
    icon: <FaEnvelope className="text-primary w-6 h-6" />,
    question: "Can I send notifications to employees?",
    answer:
      "Yes, you can send emails and in-app notifications to individual employees or groups from the 'Communication' section.",
  },
  {
    id: 5,
    icon: <FaExclamationCircle className="text-primary w-6 h-6" />,
    question: "What if an employee leaves the company?",
    answer:
      "You can mark employees as 'Inactive'. Their records remain for reporting and historical purposes.",
  },
  {
    id: 6,
    icon: <FaQuestionCircle className="text-primary w-6 h-6" />,
    question: "Can I manage employee roles and permissions?",
    answer:
      "Absolutely! Assign roles like Admin, HR, or Employee and set access permissions for different modules.",
  },
  {
    id: 7,
    icon: <FaCogs className="text-primary w-6 h-6" />,
    question: "Is task tracking available?",
    answer:
      "Yes, each employee can have tasks assigned, track progress, and mark completion. Reports are available for managers.",
  },
  {
    id: 8,
    icon: <FaVideo className="text-primary w-6 h-6" />,
    question: "Can I access training resources?",
    answer:
      "Employetica allows uploading and linking training videos and documents for employees to view anytime.",
  },
  {
    id: 9,
    icon: <FaMoneyCheck className="text-primary w-6 h-6" />,
    question: "Does it support multiple currencies?",
    answer:
      "Yes, payroll can handle multiple currencies for international employees. Conversion rates are applied automatically.",
  },
  {
    id: 10,
    icon: <FaRegSmile className="text-primary w-6 h-6" />,
    question: "Is support available if I need help?",
    answer:
      "Our support team is ready via chat or email to assist with onboarding, troubleshooting, and feature guidance.",
  },
];

const FAQ = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 4);

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-primary mb-3 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-secondary mb-12">
          Have questions about Employetica? Here are answers to help you get started and manage your team efficiently.
        </p>

        <div className="grid sm:grid-cols-2 gap-8">
          {visibleFaqs.map((faq) => (
            <div
              key={faq.id}
              className="flex gap-4 p-4 bg-base-200 rounded-lg border border-base-300 hover:shadow-lg transition duration-300"
            >
              <div className="flex-shrink-0">{faq.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-1">
                  {faq.question}
                </h3>
                <p className="text-base-content text-sm">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 flex justify-end">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 rounded-full bg-primary text-white hover:bg-primary-focus transition"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;