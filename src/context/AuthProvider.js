import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/firebase.config";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  // auth state observer
  const [user, setUser] = useState(null);
  //   loading state
  const [loading, setLoading] = useState(true);

  // signup
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   update username
  const updateUser = (userInfo) => {
    return updateProfile(user, userInfo);
  };

  //   login
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // login with gmail
  const providerLogin = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // signout
  const logOut = () => {
    signOut(auth);
    setLoading(true);
  };
  // user observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // load user from db
  const url = `https://b612-used-products-resale-server-side-mdgalibhossain1.vercel.app/user?email=${user?.email}`;
  const { data: dbUser = [], isLoading } = useQuery({
    queryKey: ["userdb", user?.email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
  // if (loading || isLoading) {
  //   return (
  //     <div className="w-56 mx-auto">
  //       <progress className="progress"></progress>
  //     </div>
  //   );
  // }
  const loadedUser = dbUser[0];

  const authInfo = {
    createUser,
    signIn,
    user,
    logOut,
    loading,
    updateUser,
    providerLogin,
    loadedUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
