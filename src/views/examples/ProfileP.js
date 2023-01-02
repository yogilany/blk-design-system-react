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
  Modal,
  Alert,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import axios from "axios";
import dayjs from "dayjs";

export default function Profile() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [formModal, setFormModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const [isFailed, setIsFiled] = React.useState(false);

  const [userData, setUserData] = React.useState({
    user_name: "",
    fname: "",
    lname: "",
    bdate: "",
    gender: "",
    email: "",
    password: "",
    nationality: "",
    role: "fan",
  });

  const fetchProfile = async () => {
    const userName = localStorage.getItem("username");
    const r = await axios
      .get(`https://world-cup-backend-g3yn.onrender.com/api/users/${userName}`)
      .then((res) => {
        console.log(res.data.data);
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const updateUser = () => {
    axios
      .patch("https://careful-elk-petticoat.cyclic.app/api/users/", userData)
      .then((res) => {
        console.log("response: ", res);
        setIsSuccess(true);
        setIsFiled(false);
        fetchProfile();
      })
      .catch((err) => {
        console.log("error: ", err);
        setIsSuccess(false);
        setIsFiled(true);
      })();
  };

  React.useEffect(() => {
    fetchProfile();
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
                        My Profile
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="px-md-2">
                        <hr className="line-success" />
                        <h3>
                          {userData.fname} {userData.lname}
                        </h3>

                        {/* <p>
                          The design system comes with three pre-built pages to
                          help you get started faster. You can change the text
                          and images and you're good to go.
                        </p> */}
                        <ul className="list-unstyled mt-5">
                          <li className="py-2">
                            <div className="d-flex align-items-center">
                              <div className="icon icon-success mb-2">
                                <i className="tim-icons icon-single-02" />
                              </div>
                              <div className="ml-3">
                                <h6>{userData.user_name}</h6>
                              </div>
                            </div>
                          </li>
                          <li className="py-2">
                            <div className="d-flex align-items-center">
                              <div className="icon icon-success mb-2">
                                <i className="tim-icons icon-single-02" />
                              </div>
                              <div className="ml-3">
                                <h6>{userData.email}</h6>
                              </div>
                            </div>
                          </li>
                          <li className="py-2">
                            <div className="d-flex align-items-center">
                              <div className="icon icon-success mb-2">
                                <i className="tim-icons icon-vector" />
                              </div>
                              <div className="ml-3">
                                <h6>
                                  {dayjs(userData.bdate).format("YYYY-MM-DD")}
                                </h6>
                              </div>
                            </div>
                          </li>
                          <li className="py-2">
                            <div className="d-flex align-items-center">
                              <div className="icon icon-success mb-2">
                                <i className="tim-icons icon-tap-02" />
                              </div>
                              <div className="ml-3">
                                <h6>{userData.nationality}</h6>
                              </div>
                            </div>
                          </li>
                          <li className="py-2">
                            <div className="d-flex align-items-center">
                              <div className="icon icon-success mb-2">
                                <i className="tim-icons icon-single-02" />
                              </div>
                              <div className="ml-3">
                                <h6>
                                  {userData.gender === "M" ? "Male" : "Female"}
                                </h6>
                              </div>
                            </div>
                          </li>

                          <li className="py-2">
                            <div className="d-flex align-items-center">
                              <div className="icon icon-success mb-2">
                                <i className="tim-icons icon-single-02" />
                              </div>
                              <div className="ml-3">
                                <h6>{userData.role}</h6>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        color="primary"
                        size="md"
                        onClick={() => setFormModal(true)}
                      >
                        Edit profile
                      </Button>
                    </CardFooter>
                    <Modal
                      modalClassName="modal-black"
                      isOpen={formModal}
                      toggle={() => setFormModal(false)}
                    >
                      <div className="modal-header justify-content-center">
                        <button
                          className="close"
                          onClick={() => setFormModal(false)}
                        >
                          <i className="tim-icons icon-simple-remove text-white" />
                        </button>
                        <div className="text-muted text-center ml-auto mr-auto">
                          <h3 className="mb-0">Edit my information</h3>
                        </div>
                      </div>
                      <div className="modal-body">
                        <Form className="form">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText></InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder={userData.fname}
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
                              placeholder={userData.lname}
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
                              placeholder={userData.user_name}
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
                              placeholder={userData.email}
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
                              placeholder={userData.nationality}
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
                                defaultChecked={
                                  userData.gender === "M" ? true : false
                                }
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
                                defaultChecked={
                                  userData.gender === "F" ? true : false
                                }
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
                        <Button
                          className="btn-round"
                          color="primary"
                          size="md"
                          onClick={updateUser}
                        >
                          Save
                        </Button>
                        {isSuccess ? (
                          <Alert color="success" style={{ marginTop: "20px" }}>
                            User updated successflly.
                          </Alert>
                        ) : null}
                        {isFailed ? (
                          <Alert color="danger" style={{ marginTop: "20px" }}>
                            Failed updating a match.
                          </Alert>
                        ) : null}
                      </div>
                    </Modal>
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
