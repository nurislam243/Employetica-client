import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const { data, isLoading, error } = useQuery({
    queryKey: ['paymentHistory', user?.email, currentPage],
    queryFn: async () => {
      const response = await axiosSecure.get('/payment-history', {
        params: {
          email: user.email,
          page: currentPage,
          limit: perPage,
        },
      });
      return response.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  const payments = data?.payments || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading payment history</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Transaction ID</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, idx) => (
              <tr key={idx}>
                <td>{p.month}</td>
                <td>{p.year}</td>
                <td>${p.amount}</td>
                <td>{p.status}</td>
                <td>{p.transactionId}</td>
                <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === perPage && (
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="btn btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-sm"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
