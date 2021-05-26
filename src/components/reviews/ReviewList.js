import React from "react";
import { useParams } from "react-router";
import ReviewItem from "./ReviewItem";

export default function ReviewList({ items, onDeleteReview }) {
  const { id } = useParams();

  const deleteReviewHandler = async (reviewId) => {
    const response = await fetch(
      `http://localhost:5000/campgrounds/${id}/reviews/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    onDeleteReview(reviewId);

    await response.json();
  };

  return (
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
  );
}
