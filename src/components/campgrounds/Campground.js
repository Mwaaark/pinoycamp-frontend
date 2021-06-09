import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Badge,
  Card,
  Carousel,
  Col,
  Row,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Moment from "react-moment";
import "moment-timezone";
import Reviews from "../reviews/Reviews";
import AuthContext from "../../context/auth-context";
import useHttp from "../../hooks/use-http";
import { Fragment } from "react";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Campground({
  _id,
  title,
  description,
  location,
  geometry,
  images,
  author,
  createdAt,
}) {
  const { isLoading, error, sendRequest: sendDeleteCampground } = useHttp();
  const authCtx = useContext(AuthContext);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(geometry.coordinates[0]);
  const [lat, setLat] = useState(geometry.coordinates[1]);
  const [zoom, setZoom] = useState(11);

  const history = useHistory();

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    new mapboxgl.Marker()
      .setLngLat(geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `
          <strong>${title} </strong>
          <br/>
          ${location}
        `
        )
      )
      .addTo(map.current);
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
    const transformData = (responseData) => {
      history.push("/campgrounds");
    };

    sendDeleteCampground(
      {
        url: `${process.env.REACT_APP_BACKEND_URL}/campgrounds/${_id}`,
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
    <Row>
      <Col md={7} className="mb-3 mb-md-0">
        {error && <Alert variant="danger">{error}</Alert>}
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
            <Card.Subtitle className="text-muted mb-2">
              {location}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2">
              <Badge variant="dark">by {author.name}</Badge>
            </Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <div>
              {authCtx.userId === author._id && (
                <Link
                  to={`/campgrounds/${_id}/edit`}
                  className="btn btn-primary"
                >
                  Edit
                </Link>
              )}
              {authCtx.userId === author._id && (
                <Button
                  type="submit"
                  className="btn btn-danger ml-2"
                  onClick={deleteCampgroundHandler}
                >
                  {isLoading ? (
                    <Fragment>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="mr-1"
                      />
                      Deleting...
                    </Fragment>
                  ) : (
                    "Delete"
                  )}
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
      </Col>
      <Col md={5}>
        <Card className="shadow-sm mb-3">
          <Card.Header>Check on map</Card.Header>
          <div className="mapbox-sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <div ref={mapContainer} className="map-container mapbox-wrapper" />
        </Card>
        <Reviews />
      </Col>
    </Row>
  );
}
