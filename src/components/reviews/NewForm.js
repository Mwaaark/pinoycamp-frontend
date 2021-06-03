import React, { useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useParams } from "react-router";

export default function NewForm({ onAddReview }) {
  const [error, setError] = useState(null);

  const bodyInputRef = useRef();
  const ratingInputRef = useRef();

  const { id } = useParams();

  const addReviewHandler = async (event) => {
    event.preventDefault();

    let enteredBody = bodyInputRef.current.value;
    let enteredRating = +ratingInputRef.current.value;

    // needs better validation with error message
    if (enteredBody.trim().length < 6) {
      console.log("Body must be at least 6 characters");
      return;
    }

    if (enteredRating < 1) {
      console.log("Rating must be at least 1");
      return;
    }

    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/campgrounds/${id}/reviews`,
        {
          method: "POST",
          body: JSON.stringify({
            body: enteredBody,
            rating: enteredRating,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      onAddReview(responseData.review);
    } catch (error) {
      setError(error.message || "Something went wrong.");
    }

    bodyInputRef.current.value = "";
    ratingInputRef.current.value = 0;
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        {error && <p>{error}</p>}
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
