import { useParams } from "react-router";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const dummyUser = {
  name: "John Doe",
  photo: "https://i.pravatar.cc/150?img=5",
  designation: "Sales Assistant",
};

const dummyChartData = [
  { month: "Apr", year: 2025, salary: 800 },
  { month: "May", year: 2025, salary: 850 },
  { month: "Jun", year: 2025, salary: 900 },
  { month: "Jul", year: 2025, salary: 950 },
];

const colors = [
  "#4A148C", "#00BCD4", "#FF9800", "#8BC34A", "#E91E63",
  "#3F51B5", "#009688", "#FF5722", "#9C27B0", "#CDDC39",
  "#2196F3", "#FFC107", "#795548", "#607D8B", "#F44336",
  "#673AB7", "#03A9F4", "#AED581", "#F06292", "#D4E157",
  "#BA68C8", "#4DB6AC", "#FFD54F", "#A1887F", "#90A4AE"
];


const EmployeeDetails = () => {
  const { slug } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img src={dummyUser.photo} alt={dummyUser.name} className="w-32 h-32 rounded-full" />
        <div>
          <p className="text-xl font-semibold">{dummyUser.name}</p>
          <p className="text-gray-600">{dummyUser.designation}</p>
          <p className="text-sm text-gray-400">Slug: {slug}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Salary vs Month</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dummyChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="salary">
              {dummyChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployeeDetails;