import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const HrPaymentChart = ({ pendingPayments, totalEmployees }) => {
  const data = [
    {
      name: "Payments",
      Pending: pendingPayments,
      Completed: totalEmployees - pendingPayments,
    },
  ];

  return (
    <div className="bg-base-200 p-6 rounded-xl shadow w-full">
      <h2 className="text-lg font-semibold mb-4 text-primary">💰 Salary Payments Status</h2>
      <div className="h-72">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Pending" fill="#ca8a04" barSize={50} />
            <Bar dataKey="Completed" fill="#2563eb" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HrPaymentChart;
