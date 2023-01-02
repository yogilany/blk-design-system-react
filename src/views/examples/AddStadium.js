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
  Alert,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import axios from "axios";

export default function AddStadiumPage() {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isFailed, setIsFiled] = React.useState(false);

  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [nameFocus, setNameFocus] = React.useState(false);
  const [addressFocus, setAddressFocus] = React.useState(false);
  const [shapeFocus, setShapeFocus] = React.useState(false);
  const [seatsFocus, setSeatsFocus] = React.useState(false);

  const [formData, updateFormData] = React.useState({
    venueName: "",
    maxrow: "",
    maxcol: "",
  });

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const postStadium = (e) => {
    if (parseInt(formData.maxcol) > 40) {
      alert("number of columns should not exceed 40");
    } else if (parseInt(formData.maxrow) > 40) {
      alert("number of rows should not exceed 40");
    } else {
      axios
        .post("https://careful-elk-petticoat.cyclic.app/api/venue/", formData)
        .then((res) => {
          console.log("response: ", res);
          setIsSuccess(true);
          setIsFiled(false);
        })
        .catch((err) => {
          console.log("error: ", err);
          setIsSuccess(false);
          setIsFiled(true);
        })();
    }
  };

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);

  React.useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

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
                <Col className="offset-lg-0 offset-md-3" lg="6" md="6">
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
                        style={{
                          color: "white",
                          fontFamily: "Qatar2022Arabic-Bold",
                          fontWeight: "900",
                        }}
                      >
                        Add Stadium
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        <InputGroup
                          className={classnames({
                            "input-group-focus": nameFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              {/* <i className="fa fa-thin fa-futbol"></i>{" "} */}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="venueName"
                            placeholder="Stadium name"
                            type="text"
                            onFocus={(e) => setNameFocus(true)}
                            onBlur={(e) => setNameFocus(false)}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": addressFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              {/* <i className="fa fa-map-pin"></i>{" "} */}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="maxrow"
                            placeholder="Number of rows"
                            type="number"
                            onFocus={(e) => setAddressFocus(true)}
                            onBlur={(e) => setAddressFocus(false)}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": addressFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              {/* <i className="fa fa-map-pin"></i>{" "} */}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="maxcol"
                            placeholder="Number of columns"
                            type="number"
                            onFocus={(e) => setShapeFocus(true)}
                            onBlur={(e) => setShapeFocus(false)}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        onClick={postStadium}
                      >
                        Add stadium
                      </Button>
                      {isSuccess ? (
                        <Alert color="success" style={{ marginTop: "20px" }}>
                          Stadium added successflly.
                        </Alert>
                      ) : null}
                      {isFailed ? (
                        <Alert color="danger" style={{ marginTop: "20px" }}>
                          Failed adding a stadium.
                        </Alert>
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
        <Footer />
      </div>
    </>
  );
}
