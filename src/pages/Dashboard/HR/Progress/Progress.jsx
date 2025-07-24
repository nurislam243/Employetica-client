import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import NoDataFound from "../../../Error/NoDataFound/NoDataFound";

const Progress = () => {
  const [selectedName, setSelectedName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: workData = [], isLoading } = useQuery({
    queryKey: ['work-records'],
    queryFn: async () => {
      const res = await axiosSecure.get('/work-records');
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-8">Fetching employee progress data, please wait...</p>;
  }

  const filtered = workData.filter((item) => {
    const matchName = selectedName ? item.name === selectedName : true;
    const matchMonth = selectedMonth ? item.date.startsWith(selectedMonth) : true;
    return matchName && matchMonth;
  });

  const totalHours = filtered.reduce((sum, item) => sum + item.hoursWorked, 0);

  const months = [...new Set(workData.map((item) => item.date.slice(0, 7)))];
  const names = [...new Set(workData.map((item) => item.name))];
  console.log(workData);

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Employee Progress</h2>

      <div className="flex gap-4 flex-wrap mb-4">
        <select
          className="select select-bordered"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          <option value="">All Employees</option>
          {names.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        <select
          className="select select-bordered"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {months.map((m) => (
             <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <p className="mb-2 font-medium">Total Hours: {totalHours}</p>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Task</th>
              <th>Hours</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6">
                  <NoDataFound message="No progress data found for the selected filters." />
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.taskType}</td>
                  <td>{item.hoursWorked}</td>
                  <td>{item.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Progress;
