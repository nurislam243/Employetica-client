import { useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { FaCheck, FaTimes } from "react-icons/fa";
import PaymentModal from "./PaymentModal";
import { Link } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import NoDataFound from "../../../Error/NoDataFound/NoDataFound";
import Swal from "sweetalert2";


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

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Employee ${emp.isVerified ? 'unverified' : 'verified'} successfully!`,
        timer: 2000,
        showConfirmButton: false,
      });

      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update verification status.',
      });
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

  if (isLoading) {
    return <p className="text-center mt-8  text-lg">Loading employees...</p>;
  }

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold mb-4">Employee List</h2>

        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-base-200">
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
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-6">
                    <NoDataFound message="No employees found." />
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
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
