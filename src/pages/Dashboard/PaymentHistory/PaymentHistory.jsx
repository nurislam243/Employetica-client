import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { useState } from 'react';

const PaymentHistory = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/api/payments?email=${user.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  // Sort ascending by month+year
  const sortedPayments = [...payments].sort((a, b) => {
    const dateA = new Date(`${a.year}-${a.month}-01`);
    const dateB = new Date(`${b.year}-${b.month}-01`);
    return dateA - dateB;
  });

  const totalPages = Math.ceil(sortedPayments.length / rowsPerPage);
  const paginatedData = sortedPayments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Amount</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((pay) => (
              <tr key={pay._id}>
                <td>{pay.month}</td>
                <td>{pay.year}</td>
                <td>${pay.amount}</td>
                <td>{pay.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
