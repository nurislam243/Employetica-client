import { useState } from 'react';

import EmployeeTableView from './EmployeeTableView';
import EmployeeCardView from './EmployeeCardView';
import useVerifiedUsers from '../../../../hooks/useVerifiedUsers';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import NoDataFound from '../../../Error/NoDataFound/NoDataFound';

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
        <p className='text-lg'>Loading All Employee ...</p>
      </div>
    );

  return (
    <div className="py-6">
      <div className="flex flex-col gap-3 @min-[460px]:flex-row justify-between items-center mb-4">
        <h2 className="text-lg @min-[320px]:text-2xl font-bold">All Verified Employees</h2>
        <button
          className="btn btn-outline btn-primary btn-sm"
          onClick={() => setView(view === 'table' ? 'card' : 'table')}
        >
          Switch to {view === 'table' ? 'Card View' : 'Table View'}
        </button>
      </div>

      {employees.length === 0 ? (
        <NoDataFound message="No verified employees found." />
      ) : view === 'table' ? (
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
