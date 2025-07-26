import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useUserRole from '../../hooks/useUserRole';
import Spinner from '../../components/common/Spinner/Spinner';

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roleLoading && role) {
      if (role === 'Employee') {
        navigate('/dashboard/employee-overview');
      } else if (role === 'HR') {
        navigate('/dashboard/hr-overview');
      } else if (role === 'Admin') {
        navigate('/dashboard/admin-overview');
      } else {
        navigate('/forbidden');
      }
    }
  }, [role, roleLoading, navigate]);

  if (roleLoading) {
    return <Spinner></Spinner>;
  }

  return <div>Redirecting...</div>;
};

export default DashboardHome;
