import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const AdminPaymentChart = ({ totalPayments, totalSalaryBudget }) => {
  const data = [
    {
      name: "Finance",
      Payments: totalPayments,
      SalaryBudget: totalSalaryBudget,
    },
  ];

  return (
    <div className="bg-base-200 p-6 rounded shadow w-full">
      <h2 className="text-xl font-semibold mb-4 text-primary">💰 Payments vs Salary Budget</h2>
      <div className="h-72">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Payments" fill="#16a34a" barSize={60} />
            <Bar dataKey="SalaryBudget" fill="#2563eb" barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminPaymentChart;
