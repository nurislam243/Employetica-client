import React from 'react';
import { useForm } from 'react-hook-form';

const EditWorkModal = ({ editingData, closeModal }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      task: editingData.task,
      hours: editingData.hours,
      date: editingData.date,
    },
  });


  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Edit Work Entry</h3>
        <form onSubmit={handleSubmit()} className="flex flex-col gap-2">
          <select {...register('task')} className="input" required>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Content">Content</option>
            <option value="Paper-work">Paper-work</option>
          </select>
          <input type="number" {...register('hours')} className="input" />
          <input type="date" {...register('date')} className="input" />
          <div className="flex gap-2 mt-2">
            <button type="submit" className="btn btn-success">Update</button>
            <button onClick={closeModal} className="btn btn-outline">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWorkModal;
