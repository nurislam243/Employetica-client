import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#16a34a", "#9333ea", "#2563eb"]; // Employees, HRs, Others

const AdminUserDistributionChart = ({ totalUsers, totalEmployees, totalHRs }) => {
  const otherUsers = Math.max(totalUsers - (totalEmployees + totalHRs), 0);

  const data = [
    { name: "Employees", value: totalEmployees },
    { name: "HRs", value: totalHRs },
    { name: "Others", value: otherUsers },
  ];

  return (
    <div className="bg-base-200 p-6 rounded shadow w-full">
      <h2 className="text-xl font-semibold mb-4 text-primary">👥 User Distribution</h2>
      <div className="h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminUserDistributionChart;
