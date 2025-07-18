
import { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { FaUserShield, FaFireAlt, FaMoneyCheckAlt } from 'react-icons/fa';

const EmployeeTableView = ({ employees, onMakeHR, onFire, onAdjustSalary }) => {
  const [salaryInput, setSalaryInput] = useState({});

  const columns = useMemo(
    () => [
      { header: '#', cell: ({ row }) => row.index + 1 },
      {
        header: 'Photo',
        accessorKey: 'photo',
        cell: ({ getValue }) => (
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={getValue()} alt="Employee" />
            </div>
          </div>
        ),
      },
      { header: 'Name', accessorKey: 'name' },
      { header: 'Email', accessorKey: 'email' },
      { header: 'Designation', accessorKey: 'designation' },
      {
        header: 'Salary',
        accessorKey: 'salary',
        cell: ({ getValue }) => `${getValue()} ৳`,
      },
      {
        header: 'Role',
        accessorKey: 'role',
        cell: ({ getValue }) => (getValue().toLowerCase() === 'hr' ? 'HR' : 'Employee'),
      },
      {
        header: 'Verified',
        accessorKey: 'isVerified',
        cell: ({ getValue }) =>
          getValue() ? (
            <span className="badge badge-success">Yes</span>
          ) : (
            <span className="badge badge-error">No</span>
          ),
      },
      {
        header: 'Adjust Salary',
        cell: ({ row }) => {
          const emp = row.original;
          return (
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="New Salary"
                className="input input-sm input-bordered"
                value={salaryInput[emp._id] || ''}
                onChange={(e) =>
                  setSalaryInput((prev) => ({ ...prev, [emp._id]: e.target.value }))
                }
              />
              <button
                className="btn btn-sm btn-info"
                onClick={() => {
                  const newSalary = parseInt(salaryInput[emp._id]);
                  if (!newSalary || newSalary <= 0) return alert('Enter valid salary');
                  if (newSalary < emp.salary) return alert("Can't decrease salary");
                  onAdjustSalary(emp._id, newSalary);
                  setSalaryInput((prev) => ({ ...prev, [emp._id]: '' }));
                }}
              >
                <FaMoneyCheckAlt />
              </button>
            </div>
          );
        },
      },
      {
        header: 'Make HR',
        cell: ({ row }) => {
          const emp = row.original;
          return emp.role.toLowerCase() === 'employee' ? (
            <button
              className="btn btn-sm btn-success"
              onClick={() => onMakeHR(emp._id)}
            >
              <FaUserShield />
            </button>
          ) : (
            <span className="text-green-600 font-semibold">HR</span>
          );
        },
      },
      {
        header: 'Fire',
        cell: ({ row }) => {
          const emp = row.original;
          return emp.isFired ? (
            <span className="text-red-500 font-semibold">Fired</span>
          ) : (
            <button
              className="btn btn-sm btn-error"
              onClick={() => onFire(emp._id)}
            >
              <FaFireAlt />
            </button>
          );
        },
      },
    ],
    [salaryInput, onMakeHR, onFire, onAdjustSalary]
  );

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-sm font-bold text-gray-700"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTableView;
