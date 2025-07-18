import { FaUserShield, FaFireAlt, FaMoneyCheckAlt } from 'react-icons/fa';

const EmployeeCardView = ({ employees, onMakeHR, onFire, onAdjustSalary, salaryInput, setSalaryInput }) => {
  
  if (!Array.isArray(employees)) {
    return <p>No employees found or invalid data</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((emp) => (
        <div
          key={emp._id}
          className="card bg-base-100 shadow-md border border-gray-300 p-4 rounded"
        >
          <div className="flex items-center gap-4">
            <img
              src={emp.photo}
              alt={emp.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{emp.name}</h3>
              <p className="text-sm text-gray-600">{emp.designation}</p>
              <p className="text-sm font-medium">
                Role: {emp.role.toLowerCase() === 'hr' ? 'HR' : 'Employee'}
              </p>
              <p className="text-sm font-medium">
                Verified: {emp.isVerified ? 'Yes' : 'No'}
              </p>
              <p className="text-sm font-medium">Salary: {emp.salary} ৳</p>
              {emp.isFired && (
                <p className="text-red-600 font-bold mt-1">Fired</p>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="New Salary"
                className="input input-sm input-bordered flex-grow"
                value={salaryInput[emp._id] || ''}
                onChange={(e) =>
                  setSalaryInput((prev) => ({ ...prev, [emp._id]: e.target.value }))
                }
              />
              <button
                className="btn btn-sm btn-info"
                onClick={() => {
                  const newSalary = parseInt(salaryInput[emp._id]);
                  if (!newSalary || newSalary <= 0) return alert('Enter valid salary');
                  if (newSalary < emp.salary) return alert("Can't decrease salary");
                  onAdjustSalary(emp._id, newSalary);
                  setSalaryInput((prev) => ({ ...prev, [emp._id]: '' }));
                }}
              >
                <FaMoneyCheckAlt />
              </button>
            </div>

            {emp.role.toLowerCase() === 'employee' && !emp.isFired && (
              <button
                className="btn btn-sm btn-success w-full"
                onClick={() => onMakeHR(emp._id)}
              >
                <FaUserShield /> Make HR
              </button>
            )}

            {!emp.fired ? (
              <button
                className="btn btn-sm btn-error w-full"
                onClick={() => onFire(emp._id)}
              >
                <FaFireAlt /> Fire
              </button>
            ) : (
              <p className="text-red-600 font-semibold text-center">Fired</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeCardView;
