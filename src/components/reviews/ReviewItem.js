import React from "react";
import { Media } from "react-bootstrap";

export default function ReviewItem({ reviewId, body, rating, onDeleteReview }) {
  const onDelete = () => {
    onDeleteReview(reviewId);
  };

  return (
    <Media as="li">
      <img
        width={32}
        height={32}
        className="mr-3"
        src="holder.js/64x64"
        alt="..."
      />
      <Media.Body>
        <h5>{rating}</h5>
        <p className="mb-2">{body}</p>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </Media.Body>
    </Media>
  );
}
