import React from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router";
import ReviewItem from "./ReviewItem";

export default function ReviewList({ items, onDeleteReview }) {
  const { id } = useParams();

  const deleteReviewHandler = async (reviewId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/campgrounds/${id}/reviews/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    onDeleteReview(reviewId);

    await response.json();
  };

  return (
    // adjust header, etc
    <Card className="shadow">
      <Card.Header>All Reviews ({items.length})</Card.Header>
      <Card.Body>
        <ul className="list-unstyled">
          {items.map(({ _id, ...otherItemProps }) => (
            <ReviewItem
              key={_id}
              reviewId={_id}
              {...otherItemProps}
              onDeleteReview={deleteReviewHandler}
            />
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
}
