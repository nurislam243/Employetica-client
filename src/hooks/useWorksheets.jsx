import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useWorksheets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: worksheets = [], isLoading } = useQuery({
    queryKey: ['worksheets', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/worksheets?email=${user.email}`);
      return res.data;
    },
  });

  return [worksheets, isLoading];
};

export default useWorksheets;
