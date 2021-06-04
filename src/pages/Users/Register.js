import React from "react";
import { Container } from "react-bootstrap";
import RegisterForm from "../../components/users/RegisterForm";

export default function Register() {
  return (
    <>
      <section>
        <Container>
          <RegisterForm />
        </Container>
      </section>
    </>
  );
}
