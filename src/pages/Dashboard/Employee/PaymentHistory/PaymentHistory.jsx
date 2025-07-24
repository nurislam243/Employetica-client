import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import NoDataFound from "../../../Error/NoDataFound/NoDataFound";

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
      return response.data; // should return { payments: [], totalCount: number }
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  const payments = data?.payments || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / perPage);

  // Generate page numbers (maximum 3 visible)
  let pageNumbers = [];
  if (totalPages <= 3) {
    pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (currentPage === 1) {
    pageNumbers = [1, 2, 3];
  } else if (currentPage === totalPages) {
    pageNumbers = [totalPages - 2, totalPages - 1, totalPages];
  } else {
    pageNumbers = [currentPage - 1, currentPage, currentPage + 1];
  }

  if (isLoading) return <p className="text-center text-lg mt-8">Loading Payment History, Please Wait...</p>;
  if (error) return <p>Error loading payment history</p>;

  return (
    <div className="py-4">
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
            {payments.length > 0 ? (
              payments.map((p, idx) => (
                <tr key={idx}>
                  <td>{p.month}</td>
                  <td>{p.year}</td>
                  <td>${p.amount}</td>
                  <td>{p.status}</td>
                  <td>{p.transactionId}</td>
                  <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <div className="py-6">
                    <NoDataFound message="No payment history available yet." />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            <button
              className="btn btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </button>

            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`btn btn-sm ${
                  currentPage === number ? "btn-primary" : "btn-outline"
                }`}
              >
                {number}
              </button>
            ))}

            <button
              className="btn btn-sm"
              disabled={currentPage === totalPages}
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
