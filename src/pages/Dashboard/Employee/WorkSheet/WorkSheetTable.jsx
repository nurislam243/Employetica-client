import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditWorkModal from "./EditWorkModal";

const WorkSheetTable = ({ worksheets }) => {
  const [editingEntry, setEditingEntry] = useState(null);

  const handleDelete = (id) => {
    console.log('delete', id);
  };

  const handleUpdate = (updatedEntry) => {
    console.log("update", updatedEntry);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Task</th>
              <th>Hours</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {worksheets.map((sheet) => (
              <tr key={sheet._id}>
                <td>{sheet.taskType}</td>
                <td>{sheet.hoursWorked}</td>
                <td>{sheet.date}</td>
                <td>
                  <button onClick={() => setEditingEntry(entry)}>
                    <FaEdit className="text-blue-600" />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(entry.id)}>
                    <FaTrash className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingEntry && (
        <EditWorkModal
          entry={editingEntry}
          onClose={() => setEditingEntry(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default WorkSheetTable;
