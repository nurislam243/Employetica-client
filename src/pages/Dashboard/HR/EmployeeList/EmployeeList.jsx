import { useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { FaCheck, FaTimes } from "react-icons/fa";
import PaymentModal from "./PaymentModal";
import { Link } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { data: employees = [], isLoading, refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/employee");
      return res.data;
      },
  });
  

  const handleToggleVerification = async (emp) => {
    try {
      await axiosSecure.patch(`/users/verify/${emp._id}`, {
        isVerified: !emp.isVerified,
      });
      alert("Status updated");
      refetch();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };


  const columns = useMemo(() => [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Verified",
      cell: ({ row }) => {
        const emp = row.original;
        return (
          <button onClick={() => handleToggleVerification(emp)} className="text-lg">
            {emp.isVerified ? <FaCheck className="text-green-600" /> : <FaTimes className="text-red-600" />}
          </button>
        );
      },
    },
    {
      header: "Bank Account",
      accessorKey: "bank_account_no",
    },
    {
      header: "Salary",
      cell: ({ row }) => `$${row.original.salary}`,
    },
    {
      header: "Pay",
      cell: ({ row }) => {
        const emp = row.original;
        return (
          <button
            disabled={!emp.isVerified}
            onClick={() => setSelectedEmployee(emp)}
            className={`btn btn-sm ${emp.isVerified ? "btn-primary" : "btn-disabled"}`}
          >
            Pay
          </button>
        );
      },
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <Link to={`/dashboard/details/${row.original.email}`} className="btn btn-outline btn-sm">
          View
        </Link>
      ),
    },
  ], [employees]);

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Employee List</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-left p-2">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {selectedEmployee && (
        <PaymentModal
          employee={selectedEmployee}
          closeModal={() => setSelectedEmployee(null)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default EmployeeList;
