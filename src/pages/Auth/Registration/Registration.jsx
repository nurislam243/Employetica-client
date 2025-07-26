import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link, useLocation, useNavigate } from "react-router";

const Registration = () => {
  const { createUser, updateUserProfile, refreshUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm({ mode: "onChange" });
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const password = watch("password");

  const onSubmit = async (data) => {
    const {
      name,
      email,
      password,
      role,
      bank_account_no,
      salary,
      designation,
      photo,
    } = data;

    if (!photo[0]) {
      return Swal.fire("Error", "Please upload a photo", "error");
    }

    setLoading(true);

    try {
      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", photo[0]);
      const imgbbKey = import.meta.env.VITE_IMGBB_KEY;
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        formData
      );
      const photoURL = imgRes.data.data.display_url;

      // 2. Create user in Firebase
      await createUser(email, password);

      // 3. Update profile in Firebase
      const userProfile = {
        displayName: name,
        photoURL,
      };
      await updateUserProfile(userProfile);

      // 4. Save user to DB
      const newUser = {
        name,
        email,
        photo: photoURL,
        role,
        bank_account_no,
        salary,
        designation,
        isVerified: false,
        createdAt: new Date(),
      };

      axiosSecure.post('/users', newUser)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire("Success", "Account created successfully!", "success");
          navigate(from);
          refreshUser();
        }
      })

    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("email", {
          type: "manual",
          message: "This email is already in use",
        });
      } else {
        Swal.fire("Error", err.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-base-100 items-center min-h-[calc(100vh-62px)] pb-5">
      <div className="max-w-md w-full mx-auto bg-base-200/70 hover:bg-base-300/50 shadow-md shadow-primary/30 p-6 mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <input
            {...register("name", { required: "Name is required" })}
            className="input input-bordered rounded w-full"
            placeholder="Full Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered rounded w-full"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              validate: {
                minLength: (v) =>
                  v.length >= 6 || "Password must be at least 6 characters",
                hasUpper: (v) =>
                  /[A-Z]/.test(v) ||
                  "Password must include at least one capital letter",
                hasSpecial: (v) =>
                  /[!@#$%^&*]/.test(v) ||
                  "Password must include at least one special character",
              },
            })}
            className="input rounded input-bordered w-full"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Role */}
          <select
            {...register("role", { required: "Please select a role" })}
            className="select select-bordered rounded w-full"
          >
            <option value="">Select Role</option>
            <option value="Employee">Employee</option>
            <option value="HR">HR</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}

          {/* Designation */}
          <input
            {...register("designation", {
              required: "Designation is required",
            })}
            className="input rounded input-bordered w-full"
            placeholder="Designation (e.g., Digital Marketer)"
          />
          {errors.designation && (
            <p className="text-red-500 text-sm">{errors.designation.message}</p>
          )}

          {/* Bank Account Number */}
          <input
            {...register("bank_account_no", {
              required: "Bank account number is required",
            })}
            className="input rounded input-bordered w-full"
            placeholder="Bank Account Number"
          />
          {errors.bank_account_no && (
            <p className="text-red-500 text-sm">
              {errors.bank_account_no.message}
            </p>
          )}

          {/* Salary */}
          <input
            type="number"
            {...register("salary", { required: "Salary is required" })}
            className="input input-bordered rounded w-full"
            placeholder="Salary"
          />
          {errors.salary && (
            <p className="text-red-500 text-sm">{errors.salary.message}</p>
          )}

          {/* Photo */}
          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: "Please upload your photo" })}
            className="file-input rounded file-input-bordered w-full"
          />
          {errors.photo && (
            <p className="text-red-500 text-sm">{errors.photo.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary rounded w-full"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
