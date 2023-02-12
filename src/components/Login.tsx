import React, { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import MyForm from "./MyForm";
import { onError, onRegisterUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          onRegisterUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate("/");
      })
      .catch((e) => {
        dispatch(onError(e.message));
      });
  };
  return <MyForm title="Sign in" handleClick={handleLogin} />;
};

export default Login;
