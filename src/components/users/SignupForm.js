import React, { useRef, useContext } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import useHttp from "../../hooks/use-http";

export default function SignupForm() {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const { isLoading, error, sendRequest: sendCreateAcoount } = useHttp();

  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const onSignupHandler = async (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;

    //needs validation
    if (password !== confirmPassword) {
      console.log("Passwords do not match.");
      return;
    }

    const transformData = (responseData) => {
      authCtx.login();
      history.replace("/campgrounds");
    };

    sendCreateAcoount(
      {
        url: `${process.env.REACT_APP_BACKEND_URL}/register`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      },
      transformData
    );
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="shadow" style={{ width: "23rem" }}>
        <Card.Header className="text-center">Create an account</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={onSignupHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" ref={nameInputRef} />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" ref={emailInputRef} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" ref={passwordInputRef} />
            </Form.Group>
            <Form.Group controlId="confirm-password">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control type="password" ref={confirmPasswordInputRef} />
            </Form.Group>

            <Button variant="dark" type="submit" block>
              {isLoading ? "Sending..." : "Register"}
            </Button>
          </Form>
          <div className="text-center mt-3">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
