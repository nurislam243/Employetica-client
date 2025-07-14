import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WorkSheetTable from "./WorkSheetTable";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const WorkSheet = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [task, setTask] = useState(""); // Empty by default
  const [hours, setHours] = useState("");
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState([]);

  const handleAdd = async () => {
    if (!task) {
      return Swal.fire({
        icon: "warning",
        title: "Task Required",
        text: "Please select a task before submitting.",
      });
    }

    if (!hours || Number(hours) <= 0) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid Hours",
        text: "Please enter a valid number of hours.",
      });
    }

    const newEntry = {
      email: user?.email,
      taskType: task,
      hoursWorked: Number(hours),
      date: date.toISOString().split("T")[0],
    };

    try {
      const res = await axiosSecure.post("/worksheets", newEntry);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Task Added",
          text: "Your task has been successfully submitted.",
          timer: 1500,
          showConfirmButton: false,
        });

        setEntries([{ id: Date.now(), ...newEntry }, ...entries]);
        setTask("");
        setHours("");
        setDate(new Date());
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please try again later.",
      });
      console.error(error);
    }
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
            required
          >
            <option value="" disabled>
              Set Task
            </option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Content">Content</option>
            <option value="Paper-work">Paper-work</option>
          </select>
        </div>

        <div className="form-control">
          <label>Hours Worked</label>
          <input
            type="number"
            className="input input-bordered"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            min="1"
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
