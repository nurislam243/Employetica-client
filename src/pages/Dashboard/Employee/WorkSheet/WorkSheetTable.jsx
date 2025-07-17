import { useState } from "react";
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from "react-icons/fa";
import EditWorkModal from "./EditWorkModal";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const WorkSheetTable = ({ worksheets,  refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [editingEntry, setEditingEntry] = useState(null);

  const handleDelete = async (taskId, refetch) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This task will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/task/${taskId}`);

          if (res.data.message === 'Task deleted successfully') {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Your task has been deleted.',
              timer: 1500,
              showConfirmButton: false,
            });

            refetch();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: res.data.message || 'Failed to delete task.',
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Something went wrong.',
          });
        }
      }
    });
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
            {worksheets.map((work) => (
              <tr key={work._id}>
                <td>{work.taskType}</td>
                <td>{work.hoursWorked}</td>
                <td>{work.date}</td>
                <td>
                  <button onClick={() => setEditingEntry(work)} className="cursor-pointer">
                    <FaEdit className="text-blue-600" />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(work._id, refetch)} className="cursor-pointer">
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
