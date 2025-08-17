import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const HrEmployeeStatusChart = ({ totalEmployees, verifiedEmployees }) => {
  const data = [
    { name: "Verified", value: verifiedEmployees },
    { name: "Unverified", value: totalEmployees - verifiedEmployees },
  ];

  const COLORS = ["#16a34a", "#dc2626"];

  return (
    <div className="bg-base-200 p-6 rounded-xl shadow w-full">
      <h2 className="text-lg font-semibold mb-4 text-primary">👥 Employee Verification Status</h2>
      <div className="h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
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

export default HrEmployeeStatusChart;
