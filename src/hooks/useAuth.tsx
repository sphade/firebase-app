import localforage from "localforage";
import React from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
const useAuth = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const auth = getAuth();
  React.useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        // ...
      } else {
        setUser(null);
        // User is signed out
        // ...
      }
    });
    return () => {
      unSubcribe();
    };
  }, [auth]);

  return user;
};

export default useAuth;
