import axios from 'axios';
import { useEffect } from 'react';

import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      config => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // Response Interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      response => response,
      error => {
        const status = error.response?.status;
        if (status === 403) {
          navigate('/forbidden');
        } else if (status === 401) {
          logOut()
            .then(() => {
              navigate('/login');
            })
            .catch(() => {});
        }
        return Promise.reject(error);
      }
    );

    // Cleanup both interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user?.accessToken, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
