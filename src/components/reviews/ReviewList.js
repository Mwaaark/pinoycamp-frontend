import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router";
import AuthContext from "../../context/auth-context";
import useHttp from "../../hooks/use-http";
import ReviewItem from "./ReviewItem";

export default function ReviewList({ items, onDeleteReview }) {
  const { error, sendRequest: sendDeleteReview } = useHttp();
  const authCtx = useContext(AuthContext);

  const { id } = useParams();

  const deleteReviewHandler = async (reviewId) => {
    const transformData = (responseData) => {
      onDeleteReview(reviewId);
    };

    sendDeleteReview(
      {
        url: `${process.env.REACT_APP_BACKEND_URL}/campgrounds/${id}/reviews/${reviewId}`,
        method: "DELETE",
        body: null,
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      },
      transformData
    );
  };

  return (
    <ul className="list-unstyled">
      {error && <Alert variant="danger">{error}</Alert>}
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
