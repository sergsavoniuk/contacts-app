import { useState, useEffect } from "react";
import firebase from "../../../firebase/firebase";

export default function useAuth() {
  const [user, setUser] = useState({ isAuthorized: null });

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          isAuthorized: true,
          name: user.displayName,
          email: user.email,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
        });
      } else {
        setUser({ isAuthorized: false });
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
}
