import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import Reviews from "../reviews/Reviews";

export default function Campground({
  _id,
  title,
  description,
  location,
  image,
  createdAt,
}) {
  const history = useHistory();

  const deleteCampgroundHandler = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/campgrounds/${_id}`,
      {
        method: "DELETE",
      }
    );

    await response.json();

    history.push("/campgrounds");
  };

  return (
    <Row>
      <Col md={7} className="mb-3 mb-md-0">
        <Card className="shadow">
          <Card.Img variant="top" src={image} alt={title} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {location}
            </Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <div>
              <Link to={`/campgrounds/${_id}/edit`} className="btn btn-primary">
                Edit
              </Link>
              <button
                type="submit"
                className="btn btn-danger ml-2"
                onClick={deleteCampgroundHandler}
              >
                Delete
              </button>
            </div>
          </Card.Body>

          <Card.Footer>
            <small className="text-muted">
              <Moment date={createdAt} format="MMM DD, YYYY" />
            </small>
          </Card.Footer>
        </Card>
      </Col>
      <Col md={5}>
        <Card className="shadow">
          <Card.Header as="h5">Reviews</Card.Header>
          <Card.Body>
            <Reviews />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
