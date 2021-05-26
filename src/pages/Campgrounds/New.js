import React from "react";
import { Container } from "react-bootstrap";
import NewForm from "../../components/campgrounds/NewForm";

export default function New() {
  return (
    <section>
      <Container>
        <NewForm />
      </Container>
    </section>
  );
}
