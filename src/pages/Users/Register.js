import React from "react";
import { Container } from "react-bootstrap";
import SignupForm from "../../components/users/SignupForm";

export default function Register() {
  return (
    <>
      <section>
        <Container>
          <SignupForm />
        </Container>
      </section>
    </>
  );
}
