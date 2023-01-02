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
import React, { useContext } from "react";
import classnames from "classnames";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "auth/authProvider";

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

export const USER_ROLE = "fan";

export default function LoginPage() {
  const { setAuth } = useContext(AuthContext);
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [isRejected, setIsRejected] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isReviewing, setIsReviewing] = React.useState(false);

  const formChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const login = (user) => {
    console.log(user);
    return axios
      .post(
        "https://careful-elk-petticoat.cyclic.app/api/users/authenticate/",
        userData
      )
      .then((res) => {
        console.log("response: ", res);
        if (res.data) {
          localStorage.setItem("username", res.data.data.user_name);
          localStorage.setItem("role", res.data.data.role);
        }
        return res.data;
      });
  };
  const postSignIn = (e) => {
    console.log("a");
    login(e).then(
      (res) => {
        console.log("response: ", res);
        window.location.href = "/";
      },
      (err) => {
        if (
          err.response.data.message ===
          "cannot authenticate : Manager not yet confirmed"
        ) {
          setIsReviewing(true);
          setIsError(false);
        } else if (
          (err.response.data.message = "username and password deoesnt match")
        ) {
          setIsReviewing(false);
          setIsError(true);
        }
        console.log("error: ", err.response.data.message);
      }
    );
  };
  const [userData, setUserData] = React.useState({
    username: "",
    password: "",
  });
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
      {/* <ExamplesNavbar /> */}
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
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
                      <CardTitle tag="h4" style={{ color: "white" }}>
                        Login
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        <InputGroup
                          className={classnames({
                            "input-group-focus": emailFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Username"
                            type="text"
                            onFocus={(e) => setEmailFocus(true)}
                            onBlur={(e) => setEmailFocus(false)}
                            name="username"
                            onChange={formChangeHandler}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            onFocus={(e) => setPasswordFocus(true)}
                            onBlur={(e) => setPasswordFocus(false)}
                            name="password"
                            onChange={formChangeHandler}
                          />
                        </InputGroup>
                        <FormGroup className="text-left">
                          <Label>
                            Don't have an account?{" "}
                            <a
                              href="#pablo"
                              onClick={() => {
                                window.location.href = "/register-page";
                              }}
                            >
                              Register now!
                            </a>
                          </Label>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        onClick={postSignIn}
                      >
                        Login
                      </Button>
                      {isError ? (
                        <p className="text-danger">
                          Username and password don't match.
                        </p>
                      ) : null}
                      {isReviewing ? (
                        <p className="text-danger">
                          Your request has not been reviewed yet.
                        </p>
                      ) : null}
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
