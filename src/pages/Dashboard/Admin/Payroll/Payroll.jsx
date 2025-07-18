import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';

const Payroll = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState('all'); // all | pending | paid

  // Fetch all payment requests
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments'); // Update this endpoint to fetch all (pending + paid)
      return res.data;
    },
  });

  // Handle payment mutation
  const payMutation = useMutation({
    mutationFn: async (paymentId) => {
      await axiosSecure.patch(`/payments/${paymentId}/pay`, {
        approvedBy: user?.email,
      });
      return paymentId;
    },
    onSuccess: (paymentId) => {
      queryClient.invalidateQueries(['payments']);
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Employee has been paid successfully!',
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: error.message || 'Something went wrong.',
      });
    },
  });

  const handlePay = (paymentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to proceed with the payment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16A34A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Pay!',
    }).then((result) => {
      if (result.isConfirmed) {
        payMutation.mutate(paymentId);
      }
    });
  };

  const filteredPayments = payments.filter((payment) => {
    if (filter === 'pending') return !payment.paymentDate;
    if (filter === 'paid') return payment.paymentDate;
    return true; // all
  });

  if (isLoading) {
    return <div className="text-center mt-10">Loading payments...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Payroll Management</h2>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-1 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-1 rounded ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`px-4 py-1 rounded ${filter === 'paid' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('paid')}
        >
          Paid
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Employee Name</th>
              <th className="border px-4 py-2">Month</th>
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Salary</th>
              <th className="border px-4 py-2">Payment Date</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No payments found.
                </td>
              </tr>
            ) : (
              filteredPayments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{payment.employeeName}</td>
                  <td className="border px-4 py-2 capitalize">{payment.month}</td>
                  <td className="border px-4 py-2">{payment.year}</td>
                  <td className="border px-4 py-2">${payment.amount.toLocaleString()}</td>
                  <td className="border px-4 py-2">
                    {payment.paymentDate
                      ? new Date(payment.paymentDate).toLocaleDateString()
                      : <span className="text-red-500 font-semibold">Pending</span>}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handlePay(payment._id)}
                      disabled={payMutation.isLoading || payment.paymentDate}
                    >
                      {payment.paymentDate ? 'Paid' : (payMutation.isLoading ? 'Processing...' : 'Pay')}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;
