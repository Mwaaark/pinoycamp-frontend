import React, { useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useHistory } from "react-router";

export default function EditForm({ _id, title, description, location, image }) {
  const titleInputRef = useRef();
  const locatioInputRef = useRef();
  const imageInputRef = useRef();
  const descriptionInputRef = useRef();

  const history = useHistory();

  const editCampgroundHandler = async (event) => {
    event.preventDefault();

    //needs validation

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/campgrounds/${_id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          title: titleInputRef.current.value,
          location: locatioInputRef.current.value,
          image: imageInputRef.current.value,
          description: descriptionInputRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await response.json();
    history.push(`/campgrounds/${_id}`);
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="shadow" style={{ width: "35rem" }}>
        <Card.Header className="text-center">Edit campground</Card.Header>
        <Card.Body>
          <Form onSubmit={editCampgroundHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                ref={titleInputRef}
                defaultValue={title}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                ref={locatioInputRef}
                defaultValue={location}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                ref={imageInputRef}
                defaultValue={image}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                ref={descriptionInputRef}
                defaultValue={description}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
