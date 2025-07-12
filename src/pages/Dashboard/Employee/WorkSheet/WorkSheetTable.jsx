import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditWorkModal from "./EditWorkModal";

const WorkSheetTable = ({ entries, setEntries }) => {
  const [editingEntry, setEditingEntry] = useState(null);

  const handleDelete = (id) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
  };

  const handleUpdate = (updatedEntry) => {
    const updatedList = entries.map((e) =>
      e.id === updatedEntry.id ? updatedEntry : e
    );
    setEntries(updatedList);
    setEditingEntry(null);
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
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.task}</td>
                <td>{entry.hours}</td>
                <td>{entry.date}</td>
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
