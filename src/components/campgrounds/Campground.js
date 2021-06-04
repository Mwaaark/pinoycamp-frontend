import React, { useContext } from "react";
import { Badge, Card, Carousel, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import Reviews from "../reviews/Reviews";
import AuthContext from "../../context/auth-context";

export default function Campground({
  _id,
  title,
  description,
  location,
  images,
  createdAt,
}) {
  const authCtx = useContext(AuthContext);
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
          <Carousel
            controls={images.length > 1 ? true : false}
            indicators={false}
          >
            {images.map(({ _id, url, filename }) => (
              <Carousel.Item key={_id}>
                <img className="d-block w-100" src={url} alt={filename} />
              </Carousel.Item>
            ))}
          </Carousel>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2">
              <Badge variant="dark">{location}</Badge>
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              by Author here
            </Card.Subtitle>

            <Card.Text>{description}</Card.Text>
            <div>
              {authCtx.isLoggedIn && (
                <Link
                  to={`/campgrounds/${_id}/edit`}
                  className="btn btn-primary"
                >
                  Edit
                </Link>
              )}
              {authCtx.isLoggedIn && (
                <button
                  type="submit"
                  className="btn btn-danger ml-2"
                  onClick={deleteCampgroundHandler}
                >
                  Delete
                </button>
              )}
            </div>
          </Card.Body>

          <Card.Footer>
            <small className="text-muted">
              <Moment date={createdAt} format="MMMM DD, YYYY" />
            </small>
          </Card.Footer>
        </Card>
      </Col>
      <Col md={5}>
        <Reviews />
      </Col>
    </Row>
  );
}
