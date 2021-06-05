import React, { useState, useRef, useContext, useEffect } from "react";
import { Badge, Card, Carousel, Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import Moment from "react-moment";
import "moment-timezone";
import Reviews from "../reviews/Reviews";
import AuthContext from "../../context/auth-context";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Campground({
  _id,
  title,
  description,
  location,
  geometry,
  images,
  createdAt,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(geometry.coordinates[0]);
  const [lat, setLat] = useState(geometry.coordinates[1]);
  const [zoom, setZoom] = useState(9);

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

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
        <Card className="shadow mb-3">
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
              by John Doe
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
                <Button
                  type="submit"
                  className="btn btn-danger ml-2"
                  onClick={deleteCampgroundHandler}
                >
                  Delete
                </Button>
              )}
            </div>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              <Moment date={createdAt} format="MMMM DD, YYYY" />
            </small>
          </Card.Footer>
        </Card>

        <Card className="shadow">
          <Card.Header>Check on map</Card.Header>
          <div className="mapbox-sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <div
            ref={mapContainer}
            className="map-container"
            style={{ height: "300px" }}
          />
        </Card>
      </Col>
      <Col md={5}>
        <Reviews />
      </Col>
    </Row>
  );
}
