import React, { useContext, useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/auth-context";

export default function LoginForm() {
  const authCtx = useContext(AuthContext);

  const [error, setError] = useState(null);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const history = useHistory();

  const onLoginHandler = async (event) => {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      authCtx.login();
      history.replace("/campgrounds");
    } catch (error) {
      setError(error.message || "Something went wrong, please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="shadow" style={{ width: "23rem" }}>
        <Card.Header className="text-center">
          Login with your account
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={onLoginHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" ref={emailInputRef} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" ref={passwordInputRef} />
            </Form.Group>
            <Button variant="dark" type="submit" block>
              Log In
            </Button>
          </Form>
          <div className="text-center mt-3">
            Need an account? <Link to="/register">Register</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
