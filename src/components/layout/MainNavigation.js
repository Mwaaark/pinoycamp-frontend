import React, { useContext, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FaCampground } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";

export default function MainNavigation() {
  const authCtx = useContext(AuthContext);

  const [expanded, setExpanded] = useState(false);

  const hideExpandHandler = () => {
    setExpanded(false);
  };

  const logoutHandler = () => {
    setExpanded(false);

    authCtx.logout();
  };

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        expanded={expanded}
        className="px-3 font-weight-bold"
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
          <span className="text-uppercase letter-spacing-wider">PinoyCamp</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto ">
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
            {!authCtx.isLoggedIn && (
              <Nav.Link as={NavLink} to="/login" onClick={hideExpandHandler}>
                Login
              </Nav.Link>
            )}
            {!authCtx.isLoggedIn && (
              <Nav.Link as={NavLink} to="/register" onClick={hideExpandHandler}>
                Register
              </Nav.Link>
            )}
            {authCtx.isLoggedIn && (
              <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
