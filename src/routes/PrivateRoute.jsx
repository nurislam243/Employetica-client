import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (authLoading || roleLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

 console.log(role);
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default PrivateRoute;
