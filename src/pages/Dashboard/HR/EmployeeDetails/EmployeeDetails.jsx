import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import NoDataFound from "../../../Error/NoDataFound/NoDataFound";
import Spinner from "../../../../components/common/Spinner/Spinner";

const colors = [
  "#4A148C", "#00BCD4", "#FF9800", "#8BC34A", "#E91E63",
  "#3F51B5", "#009688", "#FF5722", "#9C27B0", "#CDDC39",
  "#2196F3", "#FFC107", "#795548", "#607D8B", "#F44336",
  "#673AB7", "#03A9F4", "#AED581", "#F06292", "#D4E157",
  "#BA68C8", "#4DB6AC", "#FFD54F", "#A1887F", "#90A4AE"
];

const EmployeeDetails = () => {
  const { slug } = useParams();
  const axiosSecure = useAxiosSecure();

  // Get employee data from users collection by slug (email)
  const { data: employee, isLoading: loadingEmployee, error: employeeError } = useQuery({
    queryKey: ["employee", slug],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${slug}`);
      return res.data;
    }
  });


  // Get payments data from payments collection filtered by employeeEmail
  const { data: payments = [], isLoading: loadingPayments, error: paymentsError } = useQuery({
    queryKey: ["payments", slug],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/employee?email=${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });

  // Group payments by month-year and sum salary amounts
  const chartData = payments.reduce((acc, payment) => {
    const monthYear = `${payment.month.slice(0, 3).toUpperCase()} ${payment.year}`; 
    if (!acc[monthYear]) acc[monthYear] = 0;
    acc[monthYear] += payment.amount;
    return acc;
  }, {});

  // Convert grouped object to array for recharts
  const chartArray = Object.entries(chartData).map(([month, salary]) => ({
    month,
    salary,
  }));


  if (loadingEmployee || loadingPayments) return <Spinner></Spinner>;
  if (employeeError) return <p>Error loading employee data</p>;
  if (paymentsError) return <p>Error loading payment data</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={employee.employeeImage || employee.photo || "default-image-url.jpg"}
          alt={employee.name}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <p className="text-xl font-semibold">{employee.name}</p>
          <p className="text-gray-600">{employee.designation}</p>
          <p className="text-sm text-gray-400">Slug: {slug}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Salary vs Month</h3>
        {chartArray.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <NoDataFound message="No payment history found for this employee." />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartArray}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="salary">
                {chartArray.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
