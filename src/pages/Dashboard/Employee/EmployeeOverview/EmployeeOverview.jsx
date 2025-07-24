import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaTasks, FaMoneyCheckAlt, FaCalendarCheck, FaUserShield, FaUserCheck, FaUser } from 'react-icons/fa';

import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import StatCard from '../../../../components/dashboard/StatCard';

const EmployeeOverview = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['employeeOverview'],
    queryFn: async () => {
      const res = await axiosSecure.get('/overview/employee');
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="text-center mt-8 text-lg">Loading overview data...</div>;
  }

  if (isError) {
    return <div className="text-center mt-10 text-red-600">Error: {error.message}</div>;
  }

  const {
    name,
    role,
    totalTasks,
    salary,
    paidPayments,
    lastPaymentDate,
    isVerified
  } = data || {};

  return (
    <div className="py-6 space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <StatCard
          title="Name"
          value={name}
          icon={<FaUser />}
          color="#2563eb"
        />
        <StatCard
          title="Role"
          value={role}
          icon={<FaUserShield />}
          color="#9333ea"
        />
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={<FaTasks />}
          color="#16a34a"
        />
        <StatCard
          title="Salary"
          value={`$${salary}`}
          icon={<FaMoneyCheckAlt />}
          color="#ca8a04"
        />
        <StatCard
          title="Payments Received"
          value={paidPayments}
          icon={<FaUserCheck />}
          color="#10b981"
        />
        <StatCard
          title="Last Payment"
          value={lastPaymentDate ? new Date(lastPaymentDate).toLocaleDateString() : 'N/A'}
          icon={<FaCalendarCheck />}
          color="#06b6d4"
        />
        <StatCard
          title="Verified Status"
          value={isVerified ? 'Verified' : 'Not Verified'}
          icon={<FaUserShield />}
          color={isVerified ? "#22c55e" : "#ef4444"}
        />
      </div>

      {/* Extra Info */}
      <div className="bg-base-200 p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-primary mb-3">📌 Employee Dashboard Summary</h2>
        <p className="text-base sm:text-lg leading-relaxed text-base-content">
          Welcome <span className="font-semibold">{name}</span>! This is your personal overview panel.
          You have completed <strong>{totalTasks}</strong> tasks and received <strong>{paidPayments}</strong> payments.
          Your current salary is <strong>${salary}</strong>. {lastPaymentDate ? `Your last payment was on ${new Date(lastPaymentDate).toLocaleDateString()}.` : 'No payment history found.'}
          Your account is currently <span className={`font-semibold ${isVerified ? 'text-green-600' : 'text-red-600'}`}>{isVerified ? 'Verified' : 'Not Verified'}</span>.
        </p>
      </div>
    </div>
  );
};

export default EmployeeOverview;
