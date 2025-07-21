import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUserTie, FaUserCheck, FaMoneyBillWave, FaClock } from 'react-icons/fa';

import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import StatCard from '../../../../components/dashboard/StatCard';

const HrOverview = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['hrOverview'],
    queryFn: async () => {
      const res = await axiosSecure.get('/overview/hr');
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="text-center mt-10 text-lg">Loading HR overview data...</div>;
  }

  if (isError) {
    return <div className="text-center mt-10 text-red-600">Error: {error.message}</div>;
  }

  const {
    totalEmployees,
    verifiedEmployees,
    pendingPayments,
    message
  } = data || {};

  return (
    <div className="p-6 space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          icon={<FaUserTie className="text-blue-600 text-3xl" />}
        />
        <StatCard
          title="Verified Employees"
          value={verifiedEmployees}
          icon={<FaUserCheck className="text-green-600 text-3xl" />}
        />
        <StatCard
          title="Pending Payments"
          value={pendingPayments}
          icon={<FaMoneyBillWave className="text-yellow-600 text-3xl" />}
        />
        <StatCard
          title="Leaves Today"
          value={0}
          icon={<FaClock className="text-purple-600 text-3xl" />}
        />
      </div>

      {/* Extra Info */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-primary mb-3">📋 HR Dashboard Summary</h2>
        <p className="text-base sm:text-lg leading-relaxed text-base-content">
          This is your HR overview panel. You are currently managing <strong>{totalEmployees}</strong> employees,
          out of which <strong>{verifiedEmployees}</strong> are verified. There are <strong>{pendingPayments}</strong> pending salary payments.
          Keep an eye on employee leaves and approvals. Use this panel to stay on top of your HR responsibilities.
        </p>
      </div>
    </div>
  );
};

export default HrOverview;
