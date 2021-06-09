import React from "react";
import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";
import { FaFacebookSquare, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="bg-gray py-5">
        <div className="container py-3">
          <Row>
            <Col md={4} className="mb-5 mb-md-0">
              <h5 className="text-uppercase font-weight-bold mb-3">
                Directory
              </h5>
              <div className="text-muted">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                <div>
                  <Link to="#" className="text-muted mr-2">
                    <FaFacebookSquare />
                  </Link>
                  <Link to="#" className="text-muted mr-2">
                    <FaTwitter />
                  </Link>
                  <Link to="#" className="text-muted mr-2">
                    <FaInstagram />
                  </Link>
                </div>
              </div>
            </Col>

            <Col md={4} className="mb-5 mb-md-0">
              <h5 className="text-uppercase font-weight-bold mb-3">Pages</h5>
              <div className="text-muted">
                <div>
                  <Link to="/campgrounds" className="text-muted">
                    <p className="mb-0">Home</p>
                  </Link>
                  <Link to="/campgrounds/new" className="text-muted">
                    <p>New Campground</p>
                  </Link>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <h5 className="text-uppercase font-weight-bold mb-3">
                Stay In Touch
              </h5>
              <div className="text-muted">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                <InputGroup>
                  <FormControl
                    placeholder="Your Email Address"
                    aria-label="Your Email Address"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Append>
                    <Button variant="outline-secondary">Subscribe</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="bg-dark py-4 text-white">
        <div className="container">
          <p className="text-light-50 m-0">
            PinoyCamp 2021 | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
