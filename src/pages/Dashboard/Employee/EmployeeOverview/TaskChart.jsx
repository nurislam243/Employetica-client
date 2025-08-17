import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TaskChart = ({ totalTasks, paidPayments, salary }) => {
  const data = [
    { name: "Total Tasks", value: totalTasks },
    { name: "Payments Received", value: paidPayments },
    { name: "Salary ($)", value: salary },
  ];

  return (
    <div className="bg-base-200 p-6 rounded shadow">
      <h2 className="text-xl font-semibold text-primary mb-4">
        📊 Performance Overview
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#2563eb" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskChart;
