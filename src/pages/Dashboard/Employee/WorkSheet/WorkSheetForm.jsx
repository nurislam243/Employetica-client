import React from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WorkSheetForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    // Post to DB 
    // Update tanstack query cache
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-2 mb-6">
      <select {...register('task')} className="input" required>
        <option value="">Select Task</option>
        <option value="Sales">Sales</option>
        <option value="Support">Support</option>
        <option value="Content">Content</option>
        <option value="Paper-work">Paper-work</option>
      </select>

      <input type="number" {...register('hours')} className="input" placeholder="Hours Worked" required />

      <input
        type="date"
        {...register('date')}
        className="input"
        defaultValue={new Date().toISOString().split('T')[0]}
        required
      />

      <button type="submit" className="btn btn-primary">Add</button>
    </form>
  );
};

export default WorkSheetForm;
