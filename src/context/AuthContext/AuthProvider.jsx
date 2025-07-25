import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import axios from 'axios';
import Swal from 'sweetalert2';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const role = "Employee";

   //Load theme from localStorage
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme === 'dark' ? false : true;
    });


    //Save to localStorage when theme changes
    useEffect(() => {
        localStorage.setItem('theme', theme ? 'light' : 'dark');
    }, [theme]);

  useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/is-fired-user/${currentUser.email}`);
         if (res.data?.fired) {
          await Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: "Your account has been fired. Please contact the admin.",
            confirmButtonText: 'OK'
          });
          await signOut(auth);
          setUser(null);
        } else {
          setUser({
            ...currentUser,
          });
        }
      } catch (error) {
        console.error('Fired user check failed:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to verify user status. Please login again.',
          confirmButtonText: 'OK'
        });
        await signOut(auth);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return () => {
    unSubscribe();
  };
}, []);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    role,
    createUser,
    updateUserProfile,
    signIn,
    signInWithGoogle,
    logOut,
    theme,
    setTheme,
  };

  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;
