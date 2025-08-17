import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  FaUsers, FaUserTie, FaUserShield,
  FaMoneyBillWave, FaDollarSign, FaServer, FaChartBar
} from 'react-icons/fa';
import StatCard from '../../../../components/dashboard/StatCard';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import AdminUserDistributionChart from './AdminUserDistributionChart';
import AdminPaymentChart from './AdminPaymentChart';

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminOverview'],
    queryFn: async () => {
      const res = await axiosSecure.get('/overview/admin');
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="text-center mt-10 text-lg">Loading overview data...</div>;
  }

  if (isError) {
    return <div className="text-center mt-10 text-red-600">Error: {error.message}</div>;
  }

  const {
    totalUsers = 0,
    totalEmployees = 0,
    totalHRs = 0,
    totalPayments = 0,
    totalSalaryBudget = 0
  } = data || {};

  return (
    <div className="py-6 space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={<FaUsers />}
          color="#2563eb"
        />
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          icon={<FaUserTie />}
          color="#16a34a"
        />
        <StatCard
          title="Total HRs"
          value={totalHRs}
          icon={<FaUserShield />}
          color="#9333ea"
        />
        <StatCard
          title="Total Payments"
          value={totalPayments}
          icon={<FaMoneyBillWave />}
          color="#ca8a04"
        />
        <StatCard
          title="Salary Budget"
          value={`$${totalSalaryBudget.toLocaleString()}`}
          icon={<FaDollarSign />}
          color="#dc2626"
        />
      </div>

      {/* Dynamic Content Section */}
      <div className="bg-base-200 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-primary">📊 Admin Dashboard Summary</h2>
        <ul className="list-disc list-inside space-y-2 text-base-content text-base sm:text-lg">
          <li>
            <FaChartBar className="inline mr-2 text-primary" />
            Managing <strong>{totalUsers}</strong> total users including <strong>{totalEmployees}</strong> employees and <strong>{totalHRs}</strong> HRs.
          </li>
          <li>
            <FaServer className="inline mr-2 text-primary" />
            System has processed <strong>{totalPayments}</strong> payments so far with a total salary budget of <strong>${totalSalaryBudget.toLocaleString()}</strong>.
          </li>
          <li>
            <FaUserShield className="inline mr-2 text-primary" />
            As admin, you can assign roles and control access for smooth workflow.
          </li>
          <li>
            <FaMoneyBillWave className="inline mr-2 text-primary" />
            Track and audit all payroll activities in one place.
          </li>
          <li>
            <FaUsers className="inline mr-2 text-primary" />
            Ensure smooth user onboarding and HR recruitment management.
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminUserDistributionChart
          totalUsers={totalUsers}
          totalEmployees={totalEmployees}
          totalHRs={totalHRs}
        />

        <AdminPaymentChart
          totalPayments={totalPayments}
          totalSalaryBudget={totalSalaryBudget}
        />
      </div>
    </div>
  );
};

export default AdminOverview;
