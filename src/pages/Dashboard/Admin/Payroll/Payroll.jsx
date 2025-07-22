import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import PaymentModal from './Payment/PaymentModal';

const Payroll = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState('all');

  // Fetch all payment requests
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments'); 
      return res.data;
    },
  });

  const handlePay = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setShowModal(true);
  };

  const handleSuccess = () => {
    setShowModal(false);
    queryClient.invalidateQueries(['payments']);
    Swal.fire({
      icon: 'success',
      title: 'Payment Successful',
      text: 'Employee has been paid successfully!',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const filteredPayments = payments.filter((payment) => {
    if (filter === 'pending') return !payment.paymentDate;
    if (filter === 'paid') return payment.paymentDate;
    return true;
  });

  if (isLoading) {
    return <div className="text-center mt-10">Loading payments...</div>;
  }

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Payroll Management</h2>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-1 rounded ${filter === 'all' ? 'bg-primary text-white' : 'bg-base-300'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-1 rounded ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-base-300'}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`px-4 py-1 rounded ${filter === 'paid' ? 'bg-green-600 text-white' : 'bg-base-300'}`}
          onClick={() => setFilter('paid')}
        >
          Paid
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-base-300/60">
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
                <td colSpan={6} className="text-center py-4 text-base-content">
                  No payments found.
                </td>
              </tr>
            ) : (
              filteredPayments.map((payment) => (
                <tr key={payment._id} className="hover:bg-base-200/80 text-center">
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
                      disabled={payment.paymentDate}
                    >
                      {payment.paymentDate ? 'Paid' : 'Pay'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <PaymentModal
          isOpen={showModal}
          paymentId={selectedPaymentId}
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}

    </div>
  );
};

export default Payroll;
