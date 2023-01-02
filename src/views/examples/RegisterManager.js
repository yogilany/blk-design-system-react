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
import React, { useEffect } from "react";
import classnames from "classnames";
import { Outlet, useLocation } from "react-router-dom";
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
  UncontrolledAlert,
} from "reactstrap";

// core components
// import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
// import Footer from "components/Footer/Footer.js";
import axios from "axios";
// const axios = require("axios").default;

export default function RegisterManagerPage() {
  const [userData, setUserData] = React.useState({
    user_name: "",
    fname: "",
    lname: "",
    bdate: "",
    gender: "",
    email: "",
    password: "",
    nationality: "",
    role: "manager",
  });
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);

  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");

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

  const formChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const formValidation = () => {
    if (userData.password.length < 8) {
      alert("Password must be more than 8 charcters");
    } else {
      postRegisteration();
    }
  };

  const postRegisteration = (e) => {
    axios
      .post("https://careful-elk-petticoat.cyclic.app/api/users/", userData)
      .then((res) => {
        console.log("response: ", res);
        window.location.href = "/login";
      })
      .catch((err) => {
        if (err.response.status === 500) {
          alert("user is already found");
        }
        console.log("error: ", err.response.status);
      })();
  };

  useEffect(() => {
    console.log("userData", userData);
  }, [userData]);

  return (
    <>
      {/* <ExamplesNavbar /> */}
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          {isRegisterSuccess ? (
            <UncontrolledAlert className="alert-with-icon" color="success">
              <span data-notify="icon" className="tim-icons icon-bell-55" />
              <span>
                <b>Great! </b>
                Registeration has been done successflly! An admin will review
                you request shortly to let you sign in.
              </span>
            </UncontrolledAlert>
          ) : null}
          <div className="content">
            <Container>
              <Row>
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
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square-purple-1.png")}
                      />
                      <CardTitle
                        tag="h4"
                        style={{ color: "white", fontSize: "50px" }}
                      >
                        Register <br /> as a manager
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText></InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="First Name"
                            type="text"
                            name="fname"
                            onChange={formChangeHandler}
                            required
                          />
                        </InputGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText></InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Last Name"
                            type="text"
                            name="lname"
                            onChange={formChangeHandler}
                            required
                          />
                        </InputGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText></InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Username"
                            type="text"
                            name="user_name"
                            onChange={formChangeHandler}
                            required
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": emailFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText></InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="text"
                            name="email"
                            onChange={formChangeHandler}
                            onFocus={(e) => setEmailFocus(true)}
                            onBlur={(e) => setEmailFocus(false)}
                            required
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText></InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            name="password"
                            onChange={formChangeHandler}
                            type="password"
                            onFocus={(e) => setPasswordFocus(true)}
                            onBlur={(e) => setPasswordFocus(false)}
                            required
                          />
                        </InputGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText></InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Birth Date"
                            type="date"
                            name="bdate"
                            onChange={formChangeHandler}
                            required
                          />
                        </InputGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText></InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Nationality"
                            type="text"
                            name="nationality"
                            onChange={formChangeHandler}
                            required
                          />
                        </InputGroup>
                        <FormGroup check className="form-check-radio">
                          <Label check>
                            <Input
                              defaultValue="M"
                              id="gender"
                              name="gender"
                              type="radio"
                              onChange={formChangeHandler}
                            />
                            <span className="form-check-sign" />
                            Male
                          </Label>
                        </FormGroup>
                        <FormGroup check className="form-check-radio">
                          <Label check>
                            <Input
                              defaultChecked
                              id="gender"
                              name="gender"
                              type="radio"
                              onChange={formChangeHandler}
                            />
                            <span className="form-check-sign" />
                            Female
                          </Label>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        onClick={formValidation}
                      >
                        Register
                      </Button>
                      <FormGroup className="text-left">
                        <Label>
                          Already have an account?{" "}
                          <a
                            href="#pablo"
                            onClick={() => {
                              window.location.href = "/login";
                            }}
                          >
                            Login!
                          </a>
                        </Label>
                      </FormGroup>
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
        {/* <Footer /> */}
      </div>
    </>
  );
}
