// 📁 src/pages/Admin/Payroll.jsx
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const dummyPayrollRequests = [
  {
    id: 1,
    name: 'John Doe',
    salary: 800,
    month: 'June',
    year: 2025,
    paymentDate: '',
  },
  {
    id: 2,
    name: 'Jane Smith',
    salary: 1000,
    month: 'May',
    year: 2025,
    paymentDate: '',
  },
];

const Payroll = () => {
  const [requests, setRequests] = useState(dummyPayrollRequests);

  const handlePay = (id) => {
    const currentDate = new Date().toISOString().split('T')[0];

    setRequests((prev) =>
      prev.map((item) =>
        item.id === id && !item.paymentDate
          ? { ...item, paymentDate: currentDate }
          : item
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payroll Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Month</th>
              <th>Year</th>
              <th>Salary</th>
              <th>Payment Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.name}</td>
                <td>{req.month}</td>
                <td>{req.year}</td>
                <td>${req.salary}</td>
                <td>{req.paymentDate || 'Pending'}</td>
                <td>
                  {req.paymentDate ? (
                    <span className="text-green-600 font-semibold flex items-center gap-1">
                      <FaCheckCircle /> Paid
                    </span>
                  ) : (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handlePay(req.id)}
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;
