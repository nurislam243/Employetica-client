import { useForm } from "react-hook-form";

const PaymentModal = ({ employee, closeModal }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      amount: employee.salary,
      month: "",
      year: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Dummy payment request:", data);
    alert(`Payment request sent for ${employee.name}`);
    reset();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Pay {employee.name}</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            {...register("amount")}
            type="number"
            readOnly
            className="input input-bordered w-full"
          />
          <input
            {...register("month")}
            placeholder="Month (e.g., July)"
            required
            className="input input-bordered w-full"
          />
          <input
            {...register("year")}
            placeholder="Year (e.g., 2025)"
            required
            className="input input-bordered w-full"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button type="submit" className="btn btn-success">Send</button>
            <button type="button" onClick={closeModal} className="btn btn-outline">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
