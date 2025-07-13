// 📁 src/pages/Admin/AllEmployeeList.jsx
import { useState } from 'react';
import { FaUserShield, FaFireAlt, FaMoneyCheckAlt } from 'react-icons/fa';
import { MdVerified, MdUnpublished } from 'react-icons/md';
import { Dialog } from '@headlessui/react';

const dummyEmployees = [
  {
    id: 1,
    name: 'John Doe',
    designation: 'Sales Assistant',
    role: 'employee',
    isFired: false,
    salary: 800,
  },
  {
    id: 2,
    name: 'Jane Smith',
    designation: 'HR Executive',
    role: 'hr',
    isFired: false,
    salary: 1000,
  },
  {
    id: 3,
    name: 'Mark Henry',
    designation: 'Digital Marketer',
    role: 'employee',
    isFired: true,
    salary: 750,
  },
];

const AllEmployeeList = () => {
  const [employees, setEmployees] = useState(dummyEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [salaryInput, setSalaryInput] = useState('');

  const makeHR = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, role: 'hr' } : emp
      )
    );
  };

  const handleFire = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, isFired: true } : emp
      )
    );
    setIsModalOpen(false);
  };

  const openFireModal = (id) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const adjustSalary = (id) => {
    const inputSalary = parseInt(salaryInput);
    if (!inputSalary || inputSalary <= 0) return;

    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === id) {
          if (inputSalary > emp.salary) {
            return { ...emp, salary: inputSalary };
          } else {
            alert("You can't decrease the salary!");
          }
        }
        return emp;
      })
    );
    setSalaryInput('');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Verified Employees</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Role</th>
              <th>Salary</th>
              <th>Adjust Salary</th>
              <th>Make HR</th>
              <th>Fire</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.designation}</td>
                <td>{emp.role}</td>
                <td>${emp.salary}</td>
                <td>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      className="input input-sm input-bordered"
                      value={salaryInput}
                      onChange={(e) => setSalaryInput(e.target.value)}
                    />
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => adjustSalary(emp.id)}
                    >
                      <FaMoneyCheckAlt />
                    </button>
                  </div>
                </td>
                <td>
                  {emp.role === 'employee' ? (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => makeHR(emp.id)}
                    >
                      <FaUserShield />
                    </button>
                  ) : (
                    <MdVerified className="text-green-500 text-xl" />
                  )}
                </td>
                <td>
                  {emp.isFired ? (
                    <span className="text-red-500 font-semibold">Fired</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => openFireModal(emp.id)}
                    >
                      <FaFireAlt />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fire Confirm Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded max-w-sm w-full">
            <Dialog.Title className="font-bold text-lg">Confirm Fire</Dialog.Title>
            <p className="my-4">Are you sure you want to fire this employee?</p>
            <div className="flex justify-end gap-2">
              <button className="btn btn-sm" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn btn-sm btn-error" onClick={() => handleFire(selectedUserId)}>Yes, Fire</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default AllEmployeeList;
