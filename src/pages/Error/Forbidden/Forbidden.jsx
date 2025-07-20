import { Link } from "react-router";
import { FaBan } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
      <FaBan className="text-red-600 text-7xl mb-4" />
      <h1 className="text-4xl font-bold mb-2">403 - Forbidden</h1>
      <p className="text-lg text-center mb-6">
        You don’t have permission to access this page.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
