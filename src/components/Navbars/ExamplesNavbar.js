/*!

=========================================================
* BLK Design System React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

import authHeader from "auth/localStorage";
const loggedIn = authHeader();

export default function ExamplesNavbar(props) {
  console.log("ROLLLLEEE", loggedIn);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" id="navbar-brand" tag={Link}>
            <span>FIFA• </span>
            World Cup Qatar 2022
          </NavbarBrand>

          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  BLK•React
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <NavItem>
              <Link to="/">
                <Button
                  className="nav-link d-none d-lg-block"
                  color="secondary"
                >
                  Home
                </Button>
              </Link>
            </NavItem>
            <UncontrolledDropdown nav>
              <DropdownToggle
                caret
                color="default"
                data-toggle="dropdown"
                href="#pablo"
                nav
                onClick={(e) => e.preventDefault()}
              >
                <i className="fa fa-cogs d-lg-none d-xl-none" />
                Menu
              </DropdownToggle>
              <DropdownMenu className="dropdown-with-icons">
                {/* <DropdownItem href="https://demos.creative-tim.com/blk-design-system-react/#/documentation/overview">
                  <i className="tim-icons icon-paper" />
                  Documentation
                </DropdownItem> */}
                {loggedIn === "manager" ? (
                  <DropdownItem tag={Link} to="/add-match-page">
                    <i className="tim-icons icon-bullet-list-67" />
                    Add a match
                  </DropdownItem>
                ) : null}
                {loggedIn === "manager" ? (
                  <DropdownItem tag={Link} to="/add-stadium-page">
                    <i className="tim-icons icon-bullet-list-67" />
                    Add a stadium
                  </DropdownItem>
                ) : null}
                <DropdownItem tag={Link} to="/landing-page">
                  <i className="tim-icons icon-image-02" />
                  Matches
                </DropdownItem>
                {loggedIn === "manager" ? (
                  <DropdownItem tag={Link} to="/stadiums-page">
                    <i className="tim-icons icon-image-02" />
                    Stadiums
                  </DropdownItem>
                ) : null}
                {loggedIn === "fan" ? (
                  <DropdownItem tag={Link} to="/reservations">
                    <i className="tim-icons icon-image-02" />
                    My reservations
                  </DropdownItem>
                ) : null}
                {loggedIn === "admin" ? (
                  <DropdownItem tag={Link} to="/requests">
                    <i className="tim-icons icon-image-02" />
                    Requests
                  </DropdownItem>
                ) : null}
                {loggedIn === "admin" ? (
                  <DropdownItem tag={Link} to="/users">
                    <i className="tim-icons icon-image-02" />
                    Managers
                  </DropdownItem>
                ) : null}
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <NavLink tag={Link} to="/profile-page">
                My Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/login">
                Log out
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink href="https://github.com/creativetimofficial/blk-design-system-react/issues">
                Have an issue?
              </NavLink>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
