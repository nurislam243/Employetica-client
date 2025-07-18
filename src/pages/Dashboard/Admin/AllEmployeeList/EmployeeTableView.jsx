import { FaUserShield, FaFireAlt, FaMoneyCheckAlt } from 'react-icons/fa';

const EmployeeTableView = ({ employees, onMakeHR, onFire, onAdjustSalary, salaryInput, setSalaryInput }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-sm font-bold text-gray-700">
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Adjust Salary</th>
            <th>Make HR</th>
            <th>Fire</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp._id}>
              <td>{index + 1}</td>

              <td>
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={emp.photo} alt="Employee" />
                  </div>
                </div>
              </td>

              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.designation}</td>
              <td>{emp.salary} ৳</td>

              <td>{emp.role?.toLowerCase() === 'hr' ? 'HR' : 'Employee'}</td>

              <td>
                {emp.isVerified ? (
                  <span className="badge badge-success">Yes</span>
                ) : (
                  <span className="badge badge-error">No</span>
                )}
              </td>

              <td>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="New Salary"
                    className="input input-sm input-bordered"
                    value={salaryInput[emp._id] ?? ''}
                    onChange={(e) =>
                      setSalaryInput((prev) => ({ ...prev, [emp._id]: e.target.value }))
                    }
                  />
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => {
                      const newSalary = Number(salaryInput[emp._id]);
                      if (isNaN(newSalary) || newSalary <= 0) {
                        return alert('Enter a valid salary');
                      }
                      if (newSalary < emp.salary) {
                        return alert("Can't decrease salary");
                      }
                      onAdjustSalary(emp._id, newSalary);
                      setSalaryInput((prev) => ({ ...prev, [emp._id]: '' }));
                    }}
                  >
                    <FaMoneyCheckAlt />
                  </button>
                </div>
              </td>

              <td>
                {emp.role?.toLowerCase() === 'employee' ? (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => onMakeHR(emp._id)}
                  >
                    <FaUserShield />
                  </button>
                ) : (
                  <span className="text-green-600 font-semibold">HR</span>
                )}
              </td>

              <td>
                {emp.fired ? (
                  <span className="text-red-500 font-semibold">Fired</span>
                ) : (
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => onFire(emp._id)}
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
  );
};

export default EmployeeTableView;
