import React from "react";
import { Container } from "react-bootstrap";
import LoginForm from "../../components/users/LoginForm";

export default function Login() {
  return (
    <>
      <section>
        <Container>
          <LoginForm />
        </Container>
      </section>
    </>
  );
}
