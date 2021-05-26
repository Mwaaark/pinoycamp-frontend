import React from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import Moment from "react-moment";
import "moment-timezone";

export default function CampgroundItem({
  id,
  title,
  description,
  location,
  image,
  createdAt,
}) {
  return (
    <Col md={4} className="my-3">
      <Card className="shadow h-100">
        <Card.Img variant="top" src={image} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{location}</Card.Subtitle>
          <Card.Text className="text-truncate">{description}</Card.Text>
          <Link to={`/campgrounds/${id}`} className="btn btn-outline-dark">
            View Details
          </Link>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            <Moment date={createdAt} fromNow />
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
}
