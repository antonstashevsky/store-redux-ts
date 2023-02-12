import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../hooks/hooks";

interface MyFormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

const MyForm: React.FC<MyFormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  // const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((prev) => e.target.value);

    setFormIsValid(e.target.value.includes("@") && password.trim().length > 6);
    console.log(formIsValid);
  };

  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => e.target.value);

    setFormIsValid(e.target.value.trim().length > 6 && email.includes("@"));
    console.log(formIsValid);
  };

  return (
    <Form className="d-flex flex-column gap-2 justify-content-center align-items-center">
      <Form.Group
        className="m-3"
        controlId="formBasicEmail"
        style={{ width: "300px" }}
      >
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={onEmailChanged}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group
        className="m-3"
        controlId="formBasicPassword"
        style={{ width: "300px" }}
      >
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChanged}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        disabled={!formIsValid}
        onClick={(e) => {
          e.preventDefault();
          handleClick(email, password);
        }}
      >
        {title}
      </Button>
    </Form>
  );
};

export default MyForm;
