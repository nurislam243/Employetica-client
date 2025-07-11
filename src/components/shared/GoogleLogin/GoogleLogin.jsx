import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";


const GoogleLogin = () => {
    const { signInWithGoogle } = useAuth();


    const handleGoogleLogin = async () => {
        signInWithGoogle()
        .then(async (result)=>{
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
            const res = await fetch(import.meta.env.VITE_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (res.ok) {
                
            } else {
                throw new Error("Failed to save user info.");
            }
        })
        .catch (err => {
            Swal.fire({
                title: "Login Failed!",
                text: err.message,
                icon: "error",
            });
        })
    }

    return (
        <button
        onClick={handleGoogleLogin}
        className="bg-white border w-full justify-center  border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg shadow inline-flex items-center cursor-pointer gap-2"
        >
        <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="w-5 h-5" />
        Sign in with Google
        </button>
    );
};

export default GoogleLogin;
