import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const WorkSheetTable = () => {
  const { data: workEntries = [], isLoading } = useQuery({
    queryKey: ['work-entries'],
    queryFn: async () => {
      const res = await axios.get('/api/work-entries'); // only for logged-in user
      return res.data;
    },
  });


  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Task</th>
            <th>Hours</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {workEntries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.task}</td>
              <td>{entry.hours}</td>
              <td>{entry.date}</td>
              <td>
                <button onClick={() => setEditingData(entry)} className="btn btn-sm btn-info">edit</button>
                <button className="btn btn-sm btn-error ml-2">delete</button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default WorkSheetTable;
