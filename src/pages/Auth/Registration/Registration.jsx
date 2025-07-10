import { useState } from "react";
import { useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";

const Registration = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const bank = form.bank.value;
    const salary = form.salary.value;
    const designation = form.designation.value;
    const image = form.photo.files[0];

    // ✅ Password Validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password)) {
      // return toast.error(
      //   "Password must be 6+ characters, include a capital letter & special character."
      // );
    }

    // ✅ Image Upload to imgbb
    const formData = new FormData();
    formData.append("image", image);

    const imgbbKey = import.meta.env.VITE_IMGBB_KEY;
    const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
      method: "POST",
      body: formData,
    });
    const imgData = await uploadRes.json();
    const photoURL = imgData?.data?.url;

    // ✅ Call your Firebase registration logic here (not included)
    const userData = {
      name,
      email,
      photoURL,
      bank_account_no: bank,
      salary,
      designation,
      role,
    };

    console.log("Registered User:", userData);
    // toast.success("Registration Successful!");
    form.reset();
    navigate("/dashboard");
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-4 text-primary">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Full Name" className="input input-bordered w-full" required />
          <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
        </div>

        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required />

        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="bank" placeholder="Bank Account No" className="input input-bordered w-full" required />
          <input type="number" name="salary" placeholder="Salary" className="input input-bordered w-full" required />
        </div>

        <input type="text" name="designation" placeholder="Designation (e.g. Sales Assistant)" className="input input-bordered w-full" required />

        {/* Role Dropdown */}
        <select name="role" required className="select select-bordered w-full">
          <option value="" disabled selected>
            Select Role
          </option>
          <option value="employee">Employee</option>
          <option value="hr">HR</option>
        </select>

        {/* Photo Upload */}
        <div>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleImagePreview}
            className="file-input file-input-bordered w-full"
            required
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded mt-2" />
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>

      <div className="divider">OR</div>
      <button className="btn btn-outline btn-secondary w-full">
        <FaGoogle className="mr-2" /> Continue with Google
      </button>
    </div>
  );
};

export default Registration;
