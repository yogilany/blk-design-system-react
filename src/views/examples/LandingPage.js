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
import React, { useMemo } from "react";
import classnames from "classnames";

// react plugin used to create charts
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
  Table,
  Dropdown,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Modal,
  Label,
  UncontrolledTooltip,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  Alert,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

import { useTable } from "react-table";
import { Link } from "react-router-dom";
import axios from "axios";
import { USER_ROLE } from "./LoginPage";
import dayjs from "dayjs";

export default function LandingPage() {
  const [formModal, setFormModal] = React.useState(false);
  const [formDeleteModal, setFormDeleteModal] = React.useState(false);
  const [matches, setMatches] = React.useState([]);

  const [userRole, setUserRole] = React.useState("manager");

  const [team1Focus, setTeam1Focus] = React.useState(false);
  const [team2Focus, setTeam2Focus] = React.useState(false);
  const [dateFocus, setDateFocus] = React.useState(false);
  const [timeFocus, setTimeFocus] = React.useState(false);

  const [stadiumFocus, setStadiumFocus] = React.useState(false);
  const [refereeFocus, setRefereeFocus] = React.useState(false);
  const [lineman1Focus, setLineman1Focus] = React.useState(false);
  const [lineman2Focus, setLineman2Focus] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const [isFailed, setIsFiled] = React.useState(false);
  const [isSuccess2, setIsSuccess2] = React.useState(false);

  const [isFailed2, setIsFiled2] = React.useState(false);
  const [selectedMatch, setSelectedMatch] = React.useState({});

  const [refs, setRefs] = React.useState([]);
  const [teams, setteams] = React.useState([]);
  const [venues, setVenues] = React.useState([]);

  const [formData, updateFormData] = React.useState({
    t1: 1,
    t2: 2,
    venue: 1,
    ref: 1,
    lineman1: 2,
    lineman2: 3,
    date: "2-2-2011",
    time: "14:00:00",
    id: 1,
  });

  const handleChange = (e) => {
    // const dd = new Date("2015-03-04T00:00:00.000Z");
    // const newDate = dd.getFullYear() + "-" + dd.getMonth() + "-" + dd.getDay();

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

    console.log("change", formData);
  };

  const fetchMatches = async () => {
    const r = await axios
      .get("https://world-cup-backend-g3yn.onrender.com/api/match")
      .then((res) => {
        setMatches(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const data = React.useMemo(() => [...matches], [matches]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Home Team",
        accessor: "t1", // accessor is the "key" in the data
      },
      {
        Header: "Away Team",
        accessor: "t2",
      },
      {
        Header: "Stadium",
        accessor: "stadium",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Time",
        accessor: "time",
      },
      {
        Cell: (data) => {
          const { row } = data;
          const { original } = row;

          return (
            <>
              {userRole == "manager" ? (
                <Button
                  color="info"
                  size="sm"
                  onClick={() => setFormModal(true)}
                >
                  Edit
                </Button>
              ) : (
                <Link to="/reservation-page" state={{ original }}>
                  <Button
                    color="info"
                    size="sm"
                    onClick={() => console.log(original)}
                  >
                    Reservee
                  </Button>
                </Link>
              )}
            </>
          );
        },
        // Header: `Actions`,
        accessor: (data) => ({ id: data.id }),
        id: `Details`,
      },
      {
        Cell: (data) => {
          const { row } = data;
          const { original } = row;

          return (
            <>
              {userRole == "manager" ? (
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => setFormDeleteModal(true)}
                >
                  Delete
                </Button>
              ) : null}
            </>
          );
        },
        // Header: `Delete`,
        accessor: (data) => ({ id: data.id }),
        id: `delete`,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const fetchRefs = async () => {
    const r = await axios
      .get("https://world-cup-backend-g3yn.onrender.com/api/venue/refs")
      .then((res) => {
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
        setVenues(res.data.data.venues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleterRequest = (e) => {
    console.log("dlttt", e);
    axios
      .delete(`https://careful-elk-petticoat.cyclic.app/api/match/${e}/`)
      .then((res) => {
        console.log("response: ", res);
        setIsSuccess2(true);
        setIsFiled2(false);
        fetchMatches();
      })
      .catch((err) => {
        console.log("error: ", err);
        setIsSuccess2(false);
        setIsFiled2(true);
      })();
  };

  const updateMatch = () => {
    axios
      .patch("https://world-cup-backend-g3yn.onrender.com/api/match/", {
        team1: formData.team1,
        team2: formData.team2,
        venue: formData.venue,
        referee: formData.referee,
        lineman1: formData.lineman1,
        lineman2: formData.lineman2,
        date: formData.date,
        time: formData.time,
        id: selectedMatch.id,
      })
      .then((res) => {
        console.log("response: ", res);
        setIsSuccess(true);
        setIsFiled(false);
        fetchMatches();
      })
      .catch((err) => {
        console.log("error: ", err);
        setIsSuccess(false);
        setIsFiled(true);
      })();
  };

  React.useEffect(() => {
    fetchMatches();
    fetchRefs();
    fetchTeams();
    fetchVenues();
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);
  return (
    <>
      <ExamplesNavbar />
      <div className="content-center brand" style={{ width: "100%" }}>
        <Container style={{ marginTop: "200px" }}>
          <div>
            <h1
              style={{
                position: "relative",
                fontSize: "5em",
                fontWeight: "900",
                color: "white",
                textTransform: "lowercase",
                marginLeft: "-5px",
                zIndex: "1",
                fontFamily: "Qatar2022Arabic-Bold",
                textAlign: "center",
              }}
            >
              Matches
            </h1>
          </div>
          {isSuccess2 ? (
            <Alert color="success" style={{ marginTop: "20px" }}>
              Match has been deleted successflly.
            </Alert>
          ) : null}
          {isFailed2 ? (
            <Alert color="danger" style={{ marginTop: "20px" }}>
              Failed deleting the match.
            </Alert>
          ) : null}
          {!isLoading ? (
            <Container>
              {data.map((match, index) => {
                return (
                  <Card key={index} style={{ textAlign: "center" }}>
                    <CardHeader></CardHeader>
                    <CardBody>
                      <Container>
                        <Row className="justify-content-md-center">
                          <Col md="auto">
                            <img
                              alt="..."
                              className="img-fluid rounded-circle shadow"
                              src={require("assets/img/james.jpg")}
                              style={{ width: "150px", height: "150px" }}
                            />
                            <h4
                              style={{
                                textTransform: "uppercase",
                                fontWeight: "600",
                                marginTop: "10px",
                              }}
                            >
                              {match.t1}
                            </h4>
                          </Col>
                          <Col md="auto">
                            <img
                              alt="..."
                              className="img-fluid rounded-circle shadow"
                              src={require("assets/img/james.jpg")}
                              style={{ width: "150px", height: "150px" }}
                            />
                            <h4
                              style={{
                                textTransform: "uppercase",
                                fontWeight: "600",
                                marginTop: "10px",
                              }}
                            >
                              {match.t2}
                            </h4>
                          </Col>
                          <Col style={{ marginLeft: "50px" }}>
                            <ul className="list-unstyled mt-5">
                              <li className="py-2">
                                <div className="d-flex align-items-center">
                                  <div className="icon icon-success mb-2">
                                    <i className="tim-icons icon-vector" />
                                  </div>
                                  <div className="ml-3">
                                    <h6>{match.venue_name}</h6>
                                  </div>
                                </div>
                              </li>
                              <li className="py-2">
                                <div className="d-flex align-items-center">
                                  <div className="icon icon-success mb-2">
                                    <i className="tim-icons icon-tap-02" />
                                  </div>
                                  <div className="ml-3">
                                    <h6>
                                      {dayjs(match.date).format("YYYY-MM-DD")}
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
                                    <h6>{match.time}</h6>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </Col>
                          <Col>
                            <ul className="list-unstyled mt-5">
                              <li className="py-2">
                                <div className="d-flex align-items-center">
                                  <div className="icon icon-success mb-2">
                                    <i className="tim-icons icon-vector" />
                                  </div>
                                  <div className="ml-3">
                                    <h6>{match.ref}</h6>
                                  </div>
                                </div>
                              </li>
                              <li className="py-2">
                                <div className="d-flex align-items-center">
                                  <div className="icon icon-success mb-2">
                                    <i className="tim-icons icon-tap-02" />
                                  </div>
                                  <div className="ml-3">
                                    <h6>{match.lineman1}</h6>
                                  </div>
                                </div>
                              </li>
                              <li className="py-2">
                                <div className="d-flex align-items-center">
                                  <div className="icon icon-success mb-2">
                                    <i className="tim-icons icon-single-02" />
                                  </div>
                                  <div className="ml-3">
                                    <h6>{match.lineman2}</h6>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </Col>
                          <Col md="auto" style={{ marginTop: "auto" }}>
                            {USER_ROLE === "fan" ? (
                              <Link
                                to={`/reservation-page?matchId=${match.id}`}
                              >
                                <Button color="primary">Reserve</Button>
                              </Link>
                            ) : null}
                            {USER_ROLE === "manager" ? (
                              <>
                                <Button
                                  color="info"
                                  onClick={() => {
                                    console.log("match is", match);
                                    setSelectedMatch(match);

                                    setFormModal(true);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  color="danger"
                                  onClick={() => {
                                    setSelectedMatch(match);

                                    setFormDeleteModal(true);
                                  }}
                                >
                                  Delete
                                </Button>
                              </>
                            ) : null}
                          </Col>
                        </Row>
                      </Container>

                      {/* <h2>
                      {match.team1} Vs. {match.team2}
                    </h2> */}
                      {/* <div style={{ textAlign: "center" }}>
                      <div className="align-items-center">
                        <div className="ml-3">
                          <h6>{match.stadium}</h6>
                        </div>
                      </div>
                    </div> */}
                    </CardBody>
                  </Card>
                );
              })}
            </Container>
          ) : (
            <h1>Loading</h1>
          )}

          <Modal
            modalClassName="modal-black"
            isOpen={formModal}
            toggle={() => setFormModal(false)}
          >
            <div className="modal-header justify-content-center">
              <button className="close" onClick={() => setFormModal(false)}>
                <i className="tim-icons icon-simple-remove text-white" />
              </button>
              <div className="text-muted text-center ml-auto mr-auto">
                <h3 className="mb-0">Edit match details</h3>
              </div>
            </div>
            <div className="modal-body">
              <Form className="form">
                <div className="form-row">
                  <FormGroup className="col-md-6">
                    <Label style={{ fontSize: "10px" }}>Team 1</Label>

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
                        name="t1"
                        type="select"
                        onFocus={(e) => setTeam1Focus(true)}
                        onBlur={(e) => setTeam1Focus(false)}
                        onChange={handleChange}
                      >
                        <option disabled value={selectedMatch.t1} selected>
                          {selectedMatch.t1}
                        </option>
                        {teams.map((team) => {
                          return (
                            <option value={team.id}>{team.team_name}</option>
                          );
                        })}
                      </Input>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="col-md-6">
                    <Label style={{ fontSize: "10px" }}>Team 2</Label>

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
                        name="t2"
                        type="select"
                        onFocus={(e) => setTeam2Focus(true)}
                        onBlur={(e) => setTeam2Focus(false)}
                        onChange={handleChange}
                      >
                        <option disabled value={selectedMatch.t2} selected>
                          {selectedMatch.t2}
                        </option>
                        {teams.map((team) => {
                          return (
                            <option value={team.id}>{team.team_name}</option>
                          );
                        })}
                      </Input>
                    </InputGroup>
                  </FormGroup>
                </div>

                <Label style={{ fontSize: "10px" }}>Stadium</Label>

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
                    <option disabled value={selectedMatch.venue_name} selected>
                      {selectedMatch.venue_name}
                    </option>
                    {venues.map((ven) => {
                      return <option value={ven.id}>{ven.venue_name}</option>;
                    })}
                  </Input>
                </InputGroup>

                <div className="form-row">
                  <FormGroup className="col-md-6">
                    <Label style={{ fontSize: "10px" }}>Date</Label>

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
                        defaultValue={dayjs(selectedMatch.date).format(
                          "YYYY-MM-DD"
                        )}
                        onFocus={(e) => setDateFocus(true)}
                        onBlur={(e) => setDateFocus(false)}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="col-md-6">
                    <Label style={{ fontSize: "10px" }}>Time</Label>

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
                        value={selectedMatch.time}
                        onFocus={(e) => setTimeFocus(true)}
                        onBlur={(e) => setTimeFocus(false)}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </div>

                <Label style={{ fontSize: "10px" }}>Referee</Label>

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
                    name="ref"
                    type="select"
                    onFocus={(e) => setRefereeFocus(true)}
                    onBlur={(e) => setRefereeFocus(false)}
                    onChange={handleChange}
                  >
                    <option disabled value={selectedMatch.ref} selected>
                      {selectedMatch.ref}
                    </option>
                    {refs.map((ref) => {
                      return <option value={ref.id}>{ref.name}</option>;
                    })}
                  </Input>
                </InputGroup>

                <div className="form-row">
                  <FormGroup className="col-md-6">
                    <Label style={{ fontSize: "10px" }}>Lineman 1</Label>

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
                        <option
                          disabled
                          value={selectedMatch.lineman1}
                          selected
                        >
                          {selectedMatch.lineman1}
                        </option>
                        {refs.map((ref) => {
                          return <option value={ref.id}>{ref.name}</option>;
                        })}
                      </Input>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="col-md-6">
                    <Label style={{ fontSize: "10px" }}>Lineman 2</Label>

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
                        <option
                          disabled
                          value={selectedMatch.lineman2}
                          selected
                        >
                          {selectedMatch.lineman2}
                        </option>
                        {refs.map((ref) => {
                          return <option value={ref.id}>{ref.name}</option>;
                        })}
                      </Input>
                    </InputGroup>
                  </FormGroup>
                </div>
              </Form>
              <Button
                className="btn-round"
                color="primary"
                size="md"
                onClick={updateMatch}
              >
                Save
              </Button>
              {isSuccess ? (
                <Alert color="success" style={{ marginTop: "20px" }}>
                  Match updated successflly.
                </Alert>
              ) : null}
              {isFailed ? (
                <Alert color="danger" style={{ marginTop: "20px" }}>
                  Failed updating a match.
                </Alert>
              ) : null}
            </div>
          </Modal>
          <Modal
            isOpen={formDeleteModal}
            toggle={() => setFormDeleteModal(false)}
          >
            <div className="modal-header justify-content-center">
              <button
                className="close"
                onClick={() => setFormDeleteModal(false)}
              >
                <i className="tim-icons icon-simple-remove" />
              </button>
              <h4 className="title title-up">Delete Match</h4>
            </div>
            <div className="modal-body">
              <p>Are you sure? You cannot undo this step.</p>
            </div>
            <div className="modal-footer">
              <Button color="default" type="button">
                Cancel
              </Button>
              <Button
                color="danger"
                type="button"
                onClick={() => {
                  setFormDeleteModal(false);

                  DeleterRequest(selectedMatch.id);
                }}
              >
                Delete
              </Button>
            </div>
          </Modal>
        </Container>

        <Footer />
      </div>
    </>
  );
}
