/* eslint-disable react-hooks/exhaustive-deps */
import { onAuthStateChanged } from "firebase/auth";
import localforage from "localforage";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loading } from "../components";
import { auth } from "../firebase/firebase-config";
import { useAuth } from "../hooks";
const PublicRoute = () => {
  const location = useLocation();

  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <Loading/>
  }
  if (user) {
    <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
