import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider;

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const role = "Employee";

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() =>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            console.log('user in the auth state change', currentUser);
            setLoading(false);
        });

        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        role,
        createUser,
        updateUserProfile,
        signIn,
        signInWithGoogle,
        logOut
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;