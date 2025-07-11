import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";
import { auth } from "../../../firebase/firebase.init";

const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

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

    // photo validation
    if (!photo[0]) {
      return Swal.fire("Error", "Please upload a photo", "error");
    }

    setLoading(true);

    try {
      // 1. Upload image to imgbb
      const formData = new FormData();
      formData.append("image", photo[0]);
      const imgbbKey = import.meta.env.VITE_IMGBB_KEY;
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        formData
      );
      const photoURL = imgRes.data.data.display_url;

      // 2. Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL,
      });

      // 3. Save user to DB
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

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, newUser);

      Swal.fire("Success", "Account created successfully!", "success");
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
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <input
          {...register("name", { required: "Name is required" })}
          className="input input-bordered w-full"
          placeholder="Full Name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        {/* Email */}
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="input input-bordered w-full"
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
          className="input input-bordered w-full"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Role */}
        <select
          {...register("role", { required: "Please select a role" })}
          className="select select-bordered w-full"
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
          className="input input-bordered w-full"
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
          className="input input-bordered w-full"
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
          className="input input-bordered w-full"
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
          className="file-input file-input-bordered w-full"
        />
        {errors.photo && (
          <p className="text-red-500 text-sm">{errors.photo.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Registration;
