import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const axiosSecure = useAxiosSecure();
  const email = user.email;
  console.log(userProfile);

  useEffect(() => {
    if (!email) return;

    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/userProfile`, {
          params: { email }, 
        });
        setUserProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, [email]);

  if (!user) return <p>Loading...</p>;



  return (
    <div className="">
      <div className="card bg-base-100 shadow-xl">
        <div className="flex flex-col items-center p-6">
          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary"
          />
          <h2 className="text-2xl font-bold mb-1 text-primary">
            {user?.displayName || "User Name"}
          </h2>
          <p className="text-secondary mb-4">{user?.role || "Member"}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <div className="card bg-base-200 shadow-sm p-4 rounded-lg">
              <p className="font-semibold text-base-content/80">Email</p>
              <p>{user?.email || "example@email.com"}</p>
            </div>
            <div className="card bg-base-200 shadow-sm p-4 rounded-lg">
              <p className="font-semibold text-base-content/80">Phone</p>
              <p>{user?.phone || "+880123456789"}</p>
            </div>
            <div className="card bg-base-200 shadow-sm p-4 rounded-lg">
              <p className="font-semibold text-base-content/80">Address</p>
              <p>{user?.address || "Dhaka, Bangladesh"}</p>
            </div>
            <div className="card bg-base-200 shadow-sm p-4 rounded-lg">
              <p className="font-semibold text-base-content/80">Joined</p>
              <p>
                {userProfile?.createdAt
                  ? new Date(userProfile.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "2025-01-01"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
