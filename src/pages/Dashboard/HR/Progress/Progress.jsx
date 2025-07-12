import { useState } from "react";

const dummyWorkData = [
  { id: 1, name: "John", task: "Sales", hours: 6, date: "2025-07-10" },
  { id: 2, name: "John", task: "Support", hours: 5, date: "2025-07-09" },
  { id: 3, name: "Jane", task: "Content", hours: 7, date: "2025-06-30" },
  { id: 4, name: "Jane", task: "Sales", hours: 4, date: "2025-06-29" },
];

const Progress = () => {
  const [selectedName, setSelectedName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const filtered = dummyWorkData.filter((item) => {
    const matchName = selectedName ? item.name === selectedName : true;
    const matchMonth = selectedMonth ? item.date.startsWith(selectedMonth) : true;
    return matchName && matchMonth;
  });

  const totalHours = filtered.reduce((sum, item) => sum + item.hours, 0);

  const months = [...new Set(dummyWorkData.map((item) => item.date.slice(0, 7)))];
  const names = [...new Set(dummyWorkData.map((item) => item.name))];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee Progress</h2>

      <div className="flex gap-4 flex-wrap mb-4">
        <select
          className="select select-bordered"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          <option value="">All Employees</option>
          {names.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>

        <select
          className="select select-bordered"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {months.map((m) => (
            <option key={m}>{m}</option>
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
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.task}</td>
                <td>{item.hours}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Progress;
