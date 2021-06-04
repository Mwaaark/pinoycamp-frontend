import React, { useState, useRef, useContext, Fragment } from "react";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import useHttp from "../../hooks/use-http";

export default function SignupForm() {
  const { isLoading, error, sendRequest: sendRegister } = useHttp();
  const [validated, setValidated] = useState(false);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

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

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredName === "") {
      console.log("Name is required.");
      return;
    }

    if (!enteredEmail.includes("@")) {
      console.log("Email is required.");
      return;
    }

    if (enteredPassword.length < 6) {
      console.log("Password is required (at least 6 characters long).");
      return;
    }

    if (enteredConfirmPassword.length < 6) {
      console.log("Confirm password is required (at least 6 characters long).");
      return;
    }

    const transformData = (responseData) => {
      authCtx.login();
      history.replace("/campgrounds");
    };

    sendRegister(
      {
        url: `${process.env.REACT_APP_BACKEND_URL}/register`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
          confirmPassword: enteredConfirmPassword,
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
          <Form onSubmit={onSubmitHandler} validated={validated} noValidate>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameInputRef} required autoFocus />
              <Form.Control.Feedback type="valid">
                Looks Good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailInputRef} required />
              <Form.Control.Feedback type="valid">
                Looks Good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordInputRef}
                required
                minLength={6}
              />
              <Form.Control.Feedback type="valid">
                Looks Good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid password (at least 6 characters long).
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={confirmPasswordInputRef}
                required
                minLength={6}
              />
              <Form.Control.Feedback type="valid">
                Looks Good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid confirm password (at least 6 characters
                long).
              </Form.Control.Feedback>
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
                  Creating account...
                </Fragment>
              ) : (
                "Register"
              )}
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
