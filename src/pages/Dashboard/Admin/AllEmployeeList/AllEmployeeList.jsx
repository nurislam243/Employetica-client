import { useState } from 'react';

import EmployeeTableView from './EmployeeTableView';
import EmployeeCardView from './EmployeeCardView';
import useVerifiedUsers from '../../../../hooks/useVerifiedUsers';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AllEmployeeList = () => {
  const [view, setView] = useState('table');
  const [salaryInput, setSalaryInput] = useState({});
  const { employees, isLoading, refetch } = useVerifiedUsers();
  const axiosSecure = useAxiosSecure();




  const handleMakeHR = async (id) => {
    try {
      await axiosSecure.patch(`/users/make-hr/${id}`);
      alert(`User ${id} has been made HR successfully.`);
      refetch();
    } catch (error) {
      console.error(error);
      alert('Failed to update user role.');
    }
  };

  const handleFire = async (id) => {
    try {
      await axiosSecure.patch(`/users/fire/${id}`);
      alert(`User ${id} has been fired.`);
      refetch();
    } catch (error) {
      console.error(error);
      alert('Failed to fire user.');
    }
  };

  const handleAdjustSalary = async (id, newSalary) => {
    try {
      await axiosSecure.patch(`/users/salary/${id}`, { newSalary });
      alert(`Salary of user ${id} updated to ${newSalary}.`);
      refetch();
    } catch (error) {
      console.error(error);
      alert('Failed to update salary.');
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Verified Employees</h2>
        <button
          className="btn btn-outline btn-primary btn-sm"
          onClick={() => setView(view === 'table' ? 'card' : 'table')}
        >
          Switch to {view === 'table' ? 'Card View' : 'Table View'}
        </button>
      </div>

      {view === 'table' ? (
        <EmployeeTableView
          employees={employees}
          onMakeHR={handleMakeHR}
          onFire={handleFire}
          salaryInput={salaryInput}
          setSalaryInput={setSalaryInput}
          onAdjustSalary={handleAdjustSalary}
        />
      ) : (
        <EmployeeCardView
          employees={employees}
          onMakeHR={handleMakeHR}
          onFire={handleFire}
          salaryInput={salaryInput}
          setSalaryInput={setSalaryInput}
          onAdjustSalary={handleAdjustSalary}
        />
      )}
    </div>
  );
};

export default AllEmployeeList;
