/* eslint-disable react-hooks/exhaustive-deps */
import { onAuthStateChanged } from "firebase/auth";
import localforage from "localforage";
import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loading } from "../components";
import { auth } from "../firebase/firebase-config";
import { useAuth } from "../hooks";
import { useAuthState } from 'react-firebase-hooks/auth';
const RequireAuth = () => {
  const location = useLocation();
  // const user = useAuth();
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <Loading/>
  }
  if (user) {
    return <Outlet />;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
