import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FaCampground } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function MainNavigation() {
  const [expanded, setExpanded] = useState(false);

  const hideExpandHandler = () => {
    setExpanded(false);
  };

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        expanded={expanded}
        className="px-3"
        fixed="top"
      >
        <Navbar.Brand
          as={NavLink}
          to="/campgrounds"
          onClick={hideExpandHandler}
          className="d-flex align-items-center"
          exact
        >
          <FaCampground className="mr-2" />
          PinoyCamp
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              as={NavLink}
              to="/campgrounds"
              onClick={hideExpandHandler}
              exact
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/campgrounds/new"
              onClick={hideExpandHandler}
            >
              New Campground
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/login" onClick={hideExpandHandler}>
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register" onClick={hideExpandHandler}>
              Register
            </Nav.Link>
            <Nav.Link as={NavLink} to="/logout" onClick={hideExpandHandler}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
