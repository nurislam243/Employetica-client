import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "../../../firebase/firebase.init";


const GoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    const handleGoogleLogin = async () => {
        try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Prepare user data to save in MongoDB
        const userData = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            role: "Employee",
            salary: 25000,
            bank_account_no: "AC123456789",
            designation: "Support Staff",
        };

        // Send to backend
        const res = await fetch("https://your-backend-url.com/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (res.ok) {
            Swal.fire({
            title: "Login Successful!",
            text: `Welcome, ${user.displayName}`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            });
        } else {
            throw new Error("Failed to save user info.");
        }
        } catch (err) {
        Swal.fire({
            title: "Login Failed!",
            text: err.message,
            icon: "error",
        });
        }
    };

    return (
        <button
        onClick={handleGoogleLogin}
        className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded shadow inline-flex items-center gap-2"
        >
        <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="w-5 h-5" />
        Sign in with Google
        </button>
    );
};

export default GoogleLogin;
