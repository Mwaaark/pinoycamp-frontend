import React, { Fragment, useContext, useRef, useState } from "react";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import useHttp from "../../hooks/use-http";

export default function LoginForm() {
  const { isLoading, error, sendRequest: sendLogin } = useHttp();
  const [validated, setValidated] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!enteredEmail.includes("@")) {
      console.log("Email is required.");
      return;
    }

    if (enteredPassword.length < 6) {
      console.log("Password is required (at least 6 characters long).");
      return;
    }

    const transformData = (responseData) => {
      authCtx.login(responseData.userId, responseData.token);
      history.replace("/campgrounds");
    };

    sendLogin(
      {
        url: `${process.env.REACT_APP_BACKEND_URL}/login`,
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformData
    );
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="shadow" style={{ width: "23rem" }}>
        <Card.Header className="text-center">
          Login with your account
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={onSubmitHandler} validated={validated} noValidate>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                ref={emailInputRef}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                ref={passwordInputRef}
                required
                minLength={6}
              />
            </Form.Group>
            <Button variant="dark" type="submit" block>
              {isLoading ? (
                <Fragment>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mr-1"
                  />
                  Logging in...
                </Fragment>
              ) : (
                "Log In"
              )}
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
