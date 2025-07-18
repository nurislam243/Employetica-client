import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';


const useVerifiedUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: employees = [], refetch, isLoading } = useQuery({
    queryKey: ['users-verified'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users-verified');
      return res.data;
    }
  });

  return { employees, refetch, isLoading };
};

export default useVerifiedUsers;


