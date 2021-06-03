import React, { useContext } from "react";
import { Media } from "react-bootstrap";
import { RiUser3Fill } from "react-icons/ri";
import AuthContext from "../../context/auth-context";

export default function ReviewItem({ reviewId, body, rating, onDeleteReview }) {
  const authCtx = useContext(AuthContext);

  const onDelete = () => {
    onDeleteReview(reviewId);
  };

  return (
    <Media as="li" className="mb-3">
      <RiUser3Fill className="mt-1 mr-3" />
      <Media.Body>
        <h5>{rating}</h5>
        <p className="text-muted mb-2">Name here</p>
        <p className="mb-2">{body}</p>
        <div>
          {authCtx.isLoggedIn && (
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={onDelete}
            >
              Delete
            </button>
          )}
        </div>
      </Media.Body>
    </Media>
  );
}
