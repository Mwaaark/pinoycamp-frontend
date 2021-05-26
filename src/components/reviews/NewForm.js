import React, { useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useParams } from "react-router";

export default function NewForm({ onAddReview }) {
  const ratingInputRef = useRef();
  const bodyInputRef = useRef();

  const { id } = useParams();

  const addReviewHandler = async (event) => {
    event.preventDefault();

    //needs validation

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/campgrounds/${id}/reviews`,
      {
        method: "POST",
        body: JSON.stringify({
          rating: ratingInputRef.current.value,
          body: bodyInputRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    const { review } = data;
    onAddReview(review);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Form onSubmit={addReviewHandler}>
          <h5>Leave a review:</h5>
          <Form.Group controlId="rating">
            <Form.Label>Rating:</Form.Label>
            <Form.Control
              type="range"
              min={0}
              max={5}
              step={1}
              ref={ratingInputRef}
              defaultValue={0}
            />
          </Form.Group>
          <Form.Group controlId="body">
            <Form.Label>Review text:</Form.Label>
            <Form.Control as="textarea" rows={3} ref={bodyInputRef} />
          </Form.Group>
          <Button variant="dark" size="sm" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
