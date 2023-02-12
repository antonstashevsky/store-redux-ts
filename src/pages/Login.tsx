import React, { FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { onLoginUser } from "../features/userSlice";

const Login: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [formIsValid, setFormIsValid] = useState(false);
  let formIsValid;

  formIsValid = userName && email && password ? true : false;

  const dispatch = useAppDispatch();

  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName((prev) => e.target.value);
  };

  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((prev) => e.target.value);
  };

  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => e.target.value);
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(onLoginUser());
  };

  // const onFormValidation = () => {
  //   if (userName && email && password) {
  //     setFormIsValid((prev) => true);
  //   }
  //   return;
  // };

  // useEffect(() => {
  //   onFormValidation();
  // }, [userName, email, password]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light min-vh-100">
      <div className="d-flex justify-content-center align-items-center flex-column shadow-sm rounded-5 p-5 mb-5 w-25 bg-white">
        <h2>Login</h2>

        <form className="d-flex justify-content-center align-items-center flex-column mt-4 gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={userName}
            onChange={onNameChanged}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={onEmailChanged}
          />
          <label htmlFor="name">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={onPasswordChanged}
          />
          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={!formIsValid}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
