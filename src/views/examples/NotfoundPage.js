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
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

export default function NotFound() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };
  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row className="justify-content-md-center">
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <CardHeader style={{ paddingBottom: "0", textAlign: "" }}>
                      {/* <CardImg
                        alt="..."
                        src={require("assets/img/square-purple-1.png")}
                      /> */}
                      <CardTitle
                        tag="h4"
                        style={{ color: "white", marginBottom: "0" }}
                      >
                        PAGE NOT FOUND
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="px-md-2">
                        <hr className="line-success" />
                        <h3>Yousef Gilany</h3>
                        <img
                          alt="..."
                          className="img-fluid rounded shadow-lg"
                          src={require("assets/img/lora.jpg")}
                          style={{ width: "150px" }}
                        />
                        {/* <p>
                          The design system comes with three pre-built pages to
                          help you get started faster. You can change the text
                          and images and you're good to go.
                        </p> */}
                        <ul className="list-unstyled mt-5">
                          <li className="py-2">
                            <div className="d-flex align-items-center">
                              <div className="icon icon-success mb-2">
                                <i className="tim-icons icon-vector" />
                              </div>
                              <div className="ml-3">
                                <h6>2002-02-03</h6>
                              </div>
                            </div>
                          </li>
                          <li className="py-2">
                            <div className="d-flex align-items-center">
                              <div className="icon icon-success mb-2">
                                <i className="tim-icons icon-tap-02" />
                              </div>
                              <div className="ml-3">
                                <h6>Egyptian</h6>
                              </div>
                            </div>
                          </li>
                          <li className="py-2">
                            <div className="d-flex align-items-center">
                              <div className="icon icon-success mb-2">
                                <i className="tim-icons icon-single-02" />
                              </div>
                              <div className="ml-3">
                                <h6>Manager</h6>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </CardBody>
                    <CardFooter>
                      <Button className="btn-round" color="primary" size="md">
                        Edit profile
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
