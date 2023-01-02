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

export default function AddMatchPage() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [team1Focus, setTeam1Focus] = React.useState(false);
  const [team2Focus, setTeam2Focus] = React.useState(false);
  const [dateFocus, setDateFocus] = React.useState(false);
  const [timeFocus, setTimeFocus] = React.useState(false);

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isFailed, setIsFiled] = React.useState(false);

  const [stadiumFocus, setStadiumFocus] = React.useState(false);
  const [refereeFocus, setRefereeFocus] = React.useState(false);
  const [lineman1Focus, setLineman1Focus] = React.useState(false);
  const [lineman2Focus, setLineman2Focus] = React.useState(false);
  const [refs, setRefs] = React.useState([]);
  const [teams, setteams] = React.useState([]);
  const [venues, setVenues] = React.useState([]);

  const [formData, updateFormData] = React.useState({
    team1: 1,
    team2: 2,
    venue: 1,
    referee: 1,
    lineman1: 2,
    lineman2: 3,
    date: "2-2-2011",
    time: "14:00:00",
  });

  const handleChange = (e) => {
    if (e.target.name == "date" || e.target.name == "time") {
      updateFormData({
        ...formData,

        // Trimming any whitespace
        [e.target.name]: e.target.value,
      });
    } else {
      updateFormData({
        ...formData,

        // Trimming any whitespace
        [e.target.name]: parseInt(e.target.value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // ... submit to API or something
  };

  const fetchRefs = async () => {
    const r = await axios
      .get("https://world-cup-backend-g3yn.onrender.com/api/venue/refs")
      .then((res) => {
        console.log(res.data.data.seats);
        setRefs(res.data.data.seats);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTeams = async () => {
    const r = await axios
      .get("https://world-cup-backend-g3yn.onrender.com/api/venue/teams/")
      .then((res) => {
        console.log(res.data.data.seats);
        setteams(res.data.data.seats);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchVenues = async () => {
    const r = await axios
      .get("https://world-cup-backend-g3yn.onrender.com/api/venue/")
      .then((res) => {
        console.log(res.data.data);
        setVenues(res.data.data.venues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postMatch = (e) => {
    axios
      .post("https://world-cup-backend-g3yn.onrender.com/api/match/", formData)
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
  };

  React.useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  React.useEffect(() => {
    fetchTeams();
    fetchRefs();
    fetchVenues();
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
                        }}
                      >
                        Add Match
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        <InputGroup
                          className={classnames({
                            "input-group-focus": team1Focus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              {/* <i className="tim-icons icon-lock-circle" /> */}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="team1"
                            type="select"
                            onFocus={(e) => setTeam1Focus(true)}
                            onBlur={(e) => setTeam1Focus(false)}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Team 1
                            </option>
                            {teams.map((team) => {
                              return (
                                <option value={team.id}>
                                  {team.team_name}
                                </option>
                              );
                            })}
                          </Input>
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": team2Focus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              {/* <i className="tim-icons icon-single-02" /> */}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="team2"
                            type="select"
                            onFocus={(e) => setTeam2Focus(true)}
                            onBlur={(e) => setTeam2Focus(false)}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Team 2
                            </option>
                            {teams.map((team) => {
                              return (
                                <option value={team.id}>
                                  {team.team_name}
                                </option>
                              );
                            })}
                          </Input>
                        </InputGroup>

                        <InputGroup
                          className={classnames({
                            "input-group-focus": stadiumFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              {/* <i className="tim-icons icon-email-85" /> */}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="venue"
                            type="select"
                            onFocus={(e) => setStadiumFocus(true)}
                            onBlur={(e) => setStadiumFocus(false)}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Stadium
                            </option>
                            {venues.map((ven) => {
                              return (
                                <option value={ven.id}>{ven.venue_name}</option>
                              );
                            })}
                          </Input>
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": dateFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              {/* <i className="tim-icons icon-lock-circle" /> */}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="date"
                            placeholder="Date"
                            type="date"
                            onFocus={(e) => setDateFocus(true)}
                            onBlur={(e) => setDateFocus(false)}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": timeFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              {/* <i className="tim-icons icon-lock-circle" /> */}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="time"
                            placeholder="Time"
                            type="time"
                            onFocus={(e) => setTimeFocus(true)}
                            onBlur={(e) => setTimeFocus(false)}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": refereeFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              {/* <i className="tim-icons icon-lock-circle" /> */}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="referee"
                            type="select"
                            onFocus={(e) => setRefereeFocus(true)}
                            onBlur={(e) => setRefereeFocus(false)}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Referee
                            </option>
                            {refs.map((ref) => {
                              return <option value={ref.id}>{ref.name}</option>;
                            })}
                          </Input>
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": lineman1Focus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              {/* <i className="tim-icons icon-lock-circle" /> */}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="lineman1"
                            type="select"
                            onFocus={(e) => setLineman1Focus(true)}
                            onBlur={(e) => setLineman1Focus(false)}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Lineman 1
                            </option>
                            {refs.map((ref) => {
                              return <option value={ref.id}>{ref.name}</option>;
                            })}
                          </Input>
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": lineman2Focus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              {/* <i className="tim-icons icon-lock-circle" /> */}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="lineman2"
                            type="select"
                            onFocus={(e) => setLineman2Focus(true)}
                            onBlur={(e) => setLineman2Focus(false)}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Lineman 2
                            </option>
                            {refs.map((ref) => {
                              return <option value={ref.id}>{ref.name}</option>;
                            })}
                          </Input>
                        </InputGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        onClick={postMatch}
                      >
                        Add match
                      </Button>
                      {isSuccess ? (
                        <Alert color="success" style={{ marginTop: "20px" }}>
                          Match added successflly.
                        </Alert>
                      ) : null}
                      {isFailed ? (
                        <Alert color="danger" style={{ marginTop: "20px" }}>
                          Failed adding a match.
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
