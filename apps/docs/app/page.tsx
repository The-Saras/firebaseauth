"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { login, logout } from "./redux/authSlice";
import Login from "./components/Login";
import Register from "./components/Signup";
import Logout from "./components/Logout";

type RootState = {
  auth: {
    user: { email: string | null } | null;
  };
};

export default function Home() {
  const dispatch = useDispatch();
  
  
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(login({ email: currentUser.email }));
      } else {
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Login />
      <Register />
      <Logout />
    </>
  );
}
