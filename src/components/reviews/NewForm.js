import React, { useRef, useState, Fragment } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import useHttp from "../../hooks/use-http";

export default function NewForm({ onAddReview }) {
  const { isLoading, error, sendRequest: sendNewReview } = useHttp();
  const [clientSideError, setClientSideError] = useState(null);
  const { id } = useParams();
  const bodyInputRef = useRef();
  const [starRating, setStarRating] = useState(5);

  const starRatingChangeHandler = (event) => {
    setStarRating(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    setClientSideError(null);

    const enteredBody = bodyInputRef.current.value;

    console.log(starRating);

    if (+starRating < 1) {
      setClientSideError("Must be at least 1 star rating.");
      return;
    }

    if (enteredBody.length < 5) {
      setClientSideError("Body is required (at least 5 characters long).");
      return;
    }

    const transformData = (responseData) => {
      onAddReview(responseData.review);
      setStarRating(0);
      bodyInputRef.current.value = "";
    };

    sendNewReview(
      {
        url: `${process.env.REACT_APP_BACKEND_URL}/campgrounds/${id}/reviews`,
        method: "POST",
        body: JSON.stringify({
          rating: +starRating,
          body: enteredBody,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformData
    );
  };

  return (
    <Card className="mb-3 shadow">
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {clientSideError && <Alert variant="danger">{clientSideError}</Alert>}
        <Form onSubmit={onSubmitHandler}>
          <h5 className="text-muted">Leave a review:</h5>
          <fieldset className="starability-basic">
            <input
              type="radio"
              id="no-rate"
              className="input-no-rate"
              name="rating"
              value="0"
              aria-label="No rating."
              onChange={starRatingChangeHandler}
            />
            <input
              type="radio"
              id="first-rate1"
              name="rating"
              value="1"
              onChange={starRatingChangeHandler}
            />
            <label htmlFor="first-rate1" title="Terrible">
              1 star
            </label>
            <input
              type="radio"
              id="first-rate2"
              name="rating"
              value="2"
              onChange={starRatingChangeHandler}
            />
            <label htmlFor="first-rate2" title="Not good">
              2 stars
            </label>
            <input
              type="radio"
              id="first-rate3"
              name="rating"
              value="3"
              onChange={starRatingChangeHandler}
            />
            <label htmlFor="first-rate3" title="Average">
              3 stars
            </label>
            <input
              type="radio"
              id="first-rate4"
              name="rating"
              value="4"
              onChange={starRatingChangeHandler}
            />
            <label htmlFor="first-rate4" title="Very good">
              4 stars
            </label>
            <input
              type="radio"
              id="first-rate5"
              name="rating"
              value="5"
              onChange={starRatingChangeHandler}
            />
            <label htmlFor="first-rate5" title="Amazing">
              5 stars
            </label>
          </fieldset>
          <Form.Group controlId="body">
            <Form.Control
              as="textarea"
              rows={3}
              ref={bodyInputRef}
              placeholder="Type your review text here..."
            />
          </Form.Group>
          <Button variant="dark" size="sm" type="submit">
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
                Adding review...
              </Fragment>
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
