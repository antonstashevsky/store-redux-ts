import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import MyForm from "./MyForm";
import { toast } from "react-toastify";
import { onError, onRegisterUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let cartItems = useAppSelector((state) => state.items.cartItems);

  const registerToast = (email: string | null) => {
    toast.success(<p className="text-center mt-3">Welcome, {email} !</p>, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const newUser = {
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        };

        localStorage.setItem("newUser", JSON.stringify(newUser));
        dispatch(
          onRegisterUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        registerToast(user.email);
        navigate("/");
      })
      .catch((e) => {
        dispatch(onError(e.message));
      });
  };
  return <MyForm title="Register" handleClick={handleRegister} />;
};

export default Register;
