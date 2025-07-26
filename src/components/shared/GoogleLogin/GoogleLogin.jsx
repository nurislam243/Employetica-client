import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";


const GoogleLogin = () => {
  const { signInWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "Employee",
        salary: 25000,
        bank_account_no: "AC123456789",
        designation: "Support Staff",
      };

      // Save user to database only if not already present
      const res = await axiosSecure.post("/users", userData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text:
            res.data.message === "User already exists"
              ? "Welcome back to Employetica!"
              : "Account created successfully!",
        });
        navigate(from);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: err.message,
      });
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="hover:bg-primary hover:text-white border w-full justify-center  border-gray-300 bg-base-100 text-base-content font-medium py-2 px-4 rounded shadow inline-flex items-center cursor-pointer gap-2"
    >
      <img
        src="https://img.icons8.com/color/48/google-logo.png"
        alt="Google"
        className="w-5 h-5"
      />
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
