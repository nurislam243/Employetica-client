import { Link } from "react-router";
import UpdateTableAndModal from "../../../components/shared/UpdateTableAndModal/UpdateTableAndModal";

const RecentUpdates = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-[1536px] mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-10 text-center">
          Recent Updates
        </h2>
        <UpdateTableAndModal length={ 6 }></UpdateTableAndModal>

        <div className="flex justify-end mt-8">
          <Link to={'/all-update'} className="btn btn-primary">View All</Link>
        </div>
      </div>
    </section>
  );
};

export default RecentUpdates;
