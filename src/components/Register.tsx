import React from "react";
import { useAppDispatch } from "../hooks/hooks";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import MyForm from "./MyForm";
import { onError, onRegisterUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
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
  return <MyForm title="Register" handleClick={handleRegister} />;
};

export default Register;
