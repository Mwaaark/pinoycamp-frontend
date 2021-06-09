import React from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { FaLongArrowAltRight } from "react-icons/fa";
import Moment from "react-moment";
import "moment-timezone";

export default function CampgroundItem({
  id,
  title,
  description,
  location,
  images,
  createdAt,
}) {
  let imgSrc;

  if (images.length > 0) {
    imgSrc = images[0].url;
  }

  return (
    <Col md={6} lg={4} className="my-3">
      <Card className="shadow h-100">
        <Card.Img variant="top" src={imgSrc} alt={title} />
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted text-uppercase ">
            {location}
          </Card.Subtitle>
          <Card.Title className="font-weight-bold">{title}</Card.Title>
          <Card.Text className="text-muted desc-truncated">
            {description}
          </Card.Text>
          <Link
            to={`/campgrounds/${id}`}
            className="text-uppercase font-weight-bold letter-spacing-wider"
          >
            Read More <FaLongArrowAltRight className="mb-1" />
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
