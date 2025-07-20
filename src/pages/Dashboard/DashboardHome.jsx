import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useUserRole from '../../hooks/useUserRole';

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roleLoading && role) {
      if (role === 'Employee') {
        navigate('dashboard/work-sheet');
      } else if (role === 'HR') {
        navigate('dashboard/employee-list');
      } else if (role === 'Admin') {
        navigate('dashboard/all-employee-list');
      } else {
        navigate('/forbidden');
      }
    }
  }, [role, roleLoading, navigate]);

  if (roleLoading) {
    return <div>Loading dashboard...</div>;
  }

  return <div>Redirecting...</div>;
};

export default DashboardHome;
