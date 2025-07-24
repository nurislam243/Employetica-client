import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentModal = ({ employee, closeModal, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: employee.salary || 0,
      month: "",                   
      year: "",                    
    },
  });

  const onSubmit = async (data) => {
    try {
      const paymentData = {
        ...data,
        employeeId: employee._id,
        employeeName: employee.name,
        employeeEmail: employee.email,
      };

      await axiosSecure.post("/payments", paymentData);
      Swal.fire({
        icon: 'info',
        title: 'Request Sent',
        text: `Payment request sent for ${employee.name}. Awaiting admin approval.`,
        confirmButtonColor: '#3085d6',
      });
      reset();
      refetch();
      closeModal();
    } catch (err) {
      console.error("Payment failed", err);
      alert("Something went wrong");
    }
  };


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 max-w-full mx-2">
        <h3 className="text-xl font-semibold mb-4">Pay {employee.name}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <label className="font-medium">Amount (USD)</label>
          <input
            {...register("amount", { valueAsNumber: true })}
            type="number"
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
          <label className="font-medium">Month</label>
          <input
            {...register("month", { required: "Month is required" })}
            placeholder="Month (e.g., July)"
            className={`input input-bordered w-full ${errors.month ? "border-red-500" : ""}`}
          />
          {errors.month && <p className="text-red-500 text-sm">{errors.month.message}</p>}
          <label className="font-medium">Year</label>
          <input
            {...register("year", {
              required: "Year is required",
              pattern: {
                value: /^\d{4}$/,
                message: "Enter a valid 4-digit year",
              },
            })}
            placeholder="Year (e.g., 2025)"
            type="number"
            className={`input input-bordered w-full ${errors.year ? "border-red-500" : ""}`}
          />
          {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
          <div className="flex justify-end gap-2 mt-4">
            <button type="submit" className="btn btn-success">Send</button>
            <button
              type="button"
              onClick={() => {
                reset();
                closeModal();
              }}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
