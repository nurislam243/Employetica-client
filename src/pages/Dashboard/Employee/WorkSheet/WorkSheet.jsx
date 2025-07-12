import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WorkSheetTable from "./WorkSheetTable";

const WorkSheet = () => {
  const [task, setTask] = useState("Sales");
  const [hours, setHours] = useState("");
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState([]);

  const handleAdd = () => {
    const newEntry = {
      id: Date.now(),
      task,
      hours,
      date: date.toDateString(),
    };

    setEntries([newEntry, ...entries]);
    setTask("Sales");
    setHours("");
    setDate(new Date());
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Work Sheet</h2>

      {/* Horizontal Form */}
      <div className="flex flex-wrap md:flex-nowrap gap-3 items-end">
        <div className="form-control">
          <label>Task</label>
          <select
            className="select select-bordered"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          >
            <option>Sales</option>
            <option>Support</option>
            <option>Content</option>
            <option>Paper-work</option>
          </select>
        </div>

        <div className="form-control">
          <label>Hours Worked</label>
          <input
            type="number"
            className="input input-bordered"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label>Date</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="input input-bordered w-full"
          />
        </div>

        <button onClick={handleAdd} className="btn btn-primary h-fit">
          Add Task
        </button>
      </div>

      {/* Table */}
      <WorkSheetTable entries={entries} setEntries={setEntries} />
    </div>
  );
};

export default WorkSheet;
