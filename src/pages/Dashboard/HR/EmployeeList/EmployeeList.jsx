import { useState } from "react";
import PaymentModal from "./PaymentModal";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router";

const dummyEmployees = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    isVerified: true,
    bank_account_no: "1234567890",
    salary: 800,
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    isVerified: false,
    bank_account_no: "9876543210",
    salary: 950,
  },
];

const EmployeeList = () => {
  const [employees, setEmployees] = useState(dummyEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const toggleVerification = (id) => {
    const updated = employees.map((emp) =>
      emp._id === id ? { ...emp, isVerified: !emp.isVerified } : emp
    );
    setEmployees(updated);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Employee List (Demo)</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Bank Account</th>
              <th>Salary</th>
              <th>Pay</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>
                  <button
                    onClick={() => toggleVerification(emp._id)}
                    className="text-lg"
                  >
                    {emp.isVerified ? <FaCheck></FaCheck> : <FaTimes></FaTimes>}
                  </button>
                </td>
                <td>{emp.bank_account_no}</td>
                <td>${emp.salary}</td>
                <td>
                  <button
                    disabled={!emp.isVerified}
                    onClick={() => setSelectedEmployee(emp)}
                    className={`btn btn-sm ${
                      emp.isVerified ? "btn-primary" : "btn-disabled"
                    }`}
                  >
                    Pay
                  </button>
                </td>
                <td>
                  <Link to={`dashboard/details/${emp._id}`} className="btn btn-outline btn-sm">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEmployee && (
        <PaymentModal
          employee={selectedEmployee}
          closeModal={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
};

export default EmployeeList;
