import { FaUserShield, FaFireAlt, FaMoneyCheckAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const EmployeeTableView = ({ employees, onMakeHR, onFire, onAdjustSalary, salaryInput, setSalaryInput }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-sm font-bold text-base-content/90">
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
            <tr key={emp._id} className="bg-base-100">
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
                  <span className="badge badge-primary">Yes</span>
                ) : (
                  <span className="badge badge-secondary">No</span>
                )}
              </td>

              <td>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="New Salary"
                    className="input input-sm input-bordered bg-base-100"
                    value={salaryInput[emp._id] ?? ''}
                    onChange={(e) =>
                      setSalaryInput((prev) => ({
                        ...prev,
                        [emp._id]: e.target.value,
                      }))
                    }
                  />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      const newSalary = Number(salaryInput[emp._id]);
                      if (isNaN(newSalary) || newSalary <= 0) {
                        return Swal.fire({
                          icon: 'error',
                          title: 'Invalid Salary',
                          text: 'Enter a valid salary',
                          timer: 2000,
                          showConfirmButton: false,
                        });
                      }
                      if (newSalary < emp.salary) {
                        return Swal.fire({
                          icon: 'warning',
                          title: 'Decrease Not Allowed',
                          text: "Can't decrease salary",
                          timer: 2000,
                          showConfirmButton: false,
                        });
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
                    className="btn btn-sm btn-secondary"
                    onClick={() => onMakeHR(emp._id)}
                  >
                    <FaUserShield />
                  </button>
                ) : (
                  <span className="text-primary font-semibold">HR</span>
                )}
              </td>

              <td>
                {emp.fired ? (
                  <span className="text-secondary font-semibold">Fired</span>
                ) : (
                  <button
                    className="btn btn-sm btn-primary"
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
