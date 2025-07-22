import { useState } from "react";
import DatePicker from "react-datepicker";

const EditWorkModal = ({ entry, onClose, onUpdate }) => {
  const [task, setTask] = useState(entry.taskType);
  const [hours, setHours] = useState(entry.hoursWorked);
  const [date, setDate] = useState(new Date(entry.date));

  const handleSubmit = () => {
    const updated = {
      ...entry,
      taskType: task,
      hoursWorked: hours,
      date: date.toDateString(),
    };
    onUpdate(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Edit Work Entry</h3>
        <div className="space-y-3">
          <select
            className="select select-bordered w-full"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          >
            <option>Sales</option>
            <option>Support</option>
            <option>Content</option>
            <option>Paper-work</option>
          </select>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="input input-bordered w-full"
          />
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={handleSubmit} className="btn btn-success">
            Update
          </button>
          <button onClick={onClose} className="btn btn-outline">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditWorkModal;
