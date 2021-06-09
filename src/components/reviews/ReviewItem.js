import React, { useContext } from "react";
import { Badge, Media } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import AuthContext from "../../context/auth-context";

export default function ReviewItem({
  reviewId,
  body,
  rating,
  author,
  onDeleteReview,
}) {
  const authCtx = useContext(AuthContext);

  const onDelete = () => {
    onDeleteReview(reviewId);
  };

  return (
    <Media as="li" className="mb-3">
      <FaUser className="mt-1 mr-3" style={{ fontSize: "1.5rem" }} />
      <Media.Body>
        <p className="starability-result" data-rating={rating}>
          Rated: {rating} stars
        </p>
        <p className="mb-2">
          <Badge variant="secondary">by {author.name}</Badge>
        </p>
        <p className="text-muted mb-2">{body}</p>
        <div>
          {authCtx.userId === author._id && (
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
