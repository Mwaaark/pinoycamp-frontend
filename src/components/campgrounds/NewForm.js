import React, { useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useHistory } from "react-router";

export default function NewForm() {
  const titleInputRef = useRef();
  const locatioInputRef = useRef();
  const imageInputRef = useRef();
  const descriptionInputRef = useRef();

  const history = useHistory();

  const addCampgroundHandler = async (event) => {
    event.preventDefault();

    //needs validation

    const response = await fetch(`http://localhost:5000/campgrounds`, {
      method: "POST",
      body: JSON.stringify({
        title: titleInputRef.current.value,
        location: locatioInputRef.current.value,
        image: imageInputRef.current.value,
        description: descriptionInputRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    history.push(`/campgrounds/${data.campground._id}`);
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: "35rem" }}>
        <Card.Header className="text-center">Create new campground</Card.Header>
        <Card.Body>
          <Form onSubmit={addCampgroundHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" ref={titleInputRef} />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" ref={locatioInputRef} />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" ref={imageInputRef} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} ref={descriptionInputRef} />
            </Form.Group>
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
