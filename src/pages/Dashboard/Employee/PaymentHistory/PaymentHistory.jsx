import { useState } from "react";

const dummyPayments = [
  { month: "April", year: 2025, amount: 800, txId: "TXN123" },
  { month: "May", year: 2025, amount: 800, txId: "TXN124" },
  { month: "June", year: 2025, amount: 850, txId: "TXN125" },
  { month: "July", year: 2025, amount: 900, txId: "TXN126" },
  { month: "August", year: 2025, amount: 900, txId: "TXN127" },
  { month: "September", year: 2025, amount: 950, txId: "TXN128" },
];

const PaymentHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const startIndex = (currentPage - 1) * perPage;
  const paginated = dummyPayments.slice(startIndex, startIndex + perPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Month</th>
              <th>Year</th>
              <th>Amount</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item, i) => (
              <tr key={i}>
                <td>{item.month}</td>
                <td>{item.year}</td>
                <td>${item.amount}</td>
                <td>{item.txId}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Simple Pagination */}
        {dummyPayments.length > perPage && (
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
              disabled={startIndex + perPage >= dummyPayments.length}
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
