import { useState } from 'react';

import EmployeeTableView from './EmployeeTableView';
import EmployeeCardView from './EmployeeCardView';
import useVerifiedUsers from '../../../../hooks/useVerifiedUsers';

const AllEmployeeList = () => {
  const [view, setView] = useState('table');
  const { employees, isLoading, refetch } = useVerifiedUsers();




  // Handlers for actions - replace alerts with your API calls and then refetch
  const handleMakeHR = (id) => {
    alert(`Make user ${id} HR - implement API call`);
    refetch();
  };

  const handleFire = (id) => {
    alert(`Fire user ${id} - implement API call`);
    refetch();
  };

  const handleAdjustSalary = (id, newSalary) => {
    alert(`Adjust salary of user ${id} to ${newSalary} - implement API call`);
    refetch();
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
          onAdjustSalary={handleAdjustSalary}
        />
      ) : (
        <EmployeeCardView
          employees={employees}
          onMakeHR={handleMakeHR}
          onFire={handleFire}
          onAdjustSalary={handleAdjustSalary}
        />
      )}
    </div>
  );
};

export default AllEmployeeList;
