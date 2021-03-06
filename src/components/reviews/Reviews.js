import React, { useCallback, useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import ReviewList from "./ReviewList";
import NewForm from "./NewForm";

export default function Reviews() {
  const [reviews, setReviews] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const fetchReviewsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/campgrounds/${id}/reviews`
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      setReviews(data.reviews);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchReviewsHandler();
  }, [fetchReviewsHandler]);

  const addReviewHandler = (data) => {
    setReviews((prevReviews) => {
      return [data, ...prevReviews];
    });
  };

  const deleteReviewHandler = (deletedReviewId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review._id !== deletedReviewId)
    );
  };

  let reviewContent;

  if (reviews && reviews.length > 0) {
    reviewContent = (
      <ReviewList items={reviews} onDeleteReview={deleteReviewHandler} />
    );
  }

  if (!reviews || reviews.length === 0) {
    reviewContent = <p>No available reviews.</p>;
  }

  if (error) {
    reviewContent = <p>{error}</p>;
  }

  if (isLoading) {
    reviewContent = (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <NewForm onAddReview={addReviewHandler} />
      <Card className="shadow">
        <Card.Header className="font-weight-bold text-uppercase">
          All Reviews ({reviews && reviews.length > 0 ? reviews.length : 0})
        </Card.Header>
        <Card.Body>{reviewContent}</Card.Body>
      </Card>
    </>
  );
}
