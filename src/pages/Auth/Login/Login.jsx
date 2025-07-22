import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router";
import { auth } from "../../../firebase/firebase.init";
import GoogleLogin from "../../../components/shared/GoogleLogin/GoogleLogin";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard");
    } catch (error) {
      let message = "Login failed!";
      if (error.code === "auth/user-not-found") {
        message = "User not found.";
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password.";
      }

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
      });
    }
  };

  return (
    <div className="flex justify-center bg-base-100 items-center min-h-[calc(100vh-62px)] px-4">
      <div className="bg-base-200/70 hover:bg-base-300/50 shadow-md shadow-primary/30 rounded p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Login to Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`w-full border px-4 py-2 rounded bg-base-100 focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300 focus:border-primary"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: isSubmitted && !errors.email ? "Password is required" : false,
              })}
              className={`w-full border px-4 py-2 rounded bg-base-100 focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300 focus:border-primary"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white cursor-pointer font-semibold py-2 rounded hover:bg-primary/90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-primary underline hover:text-primary/80">
            Register here
          </a>
        </p>
        
        <div className="divider">OR</div>
        
        <GoogleLogin></GoogleLogin>
      </div>
    </div>
  );
};

export default Login;
