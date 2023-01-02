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
  Table,
  Modal,
  Alert,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import { Link, Redirect, useLocation } from "react-router-dom";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import axios from "axios";

const initialFormData = Object.freeze({
  team1: "",
  team2: "",
  stadium: "",
  referee: "",
  lineman1: "",
  lineman2: "",
  date: "",
});

var timeSec = new Date().getSeconds();

export default function ReserveMatch() {
  const { search } = useLocation();
  console.log("time", new Date().getSeconds());

  const matchID = new URLSearchParams(search).get(`matchId`);
  const [time, setTime] = React.useState(new Date().getSeconds());

  const [formModal, setFormModal] = React.useState(false);
  const [card, setCard] = React.useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const [seats, setSeats] = React.useState([]);

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isFailed, setIsFiled] = React.useState(false);

  const location = useLocation();
  const data = location.state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("target name", name);
    console.log("target value", value);

    setCard({ ...card, [name]: value });
  };

  const handleInputFocus = (e) => {
    setCard({ ...card, focus: e.target.name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedSeats);
    setFormModal(true);

    // ... submit to API or something
  };

  const handleSubmitPay = (e) => {
    e.preventDefault();
    console.log(card);
    setFormModal(false);
    insertTicket();

    window.location.href = "/landing-page";

    // ... submit to API or something
  };

  const handleSeatClick = (e) => {
    if (
      selectedSeats.some((s) => s.row === e.seatRow) &&
      selectedSeats.some((s) => s.col === e.seatCol)
    ) {
      const selectedSeat1 = document.getElementById(e.id);
      selectedSeat1.classList.remove("btn-success");
      selectedSeat1.classList.add("btn-info");

      console.log("deleted seat", selectedSeat1);
      // selectedSeat.remove("btn-warning");
      // selectedSeat.add("btn-info");

      const newSeats = selectedSeats.filter((seat) => {
        return seat.id !== e.id;
      });

      setSelectedSeats(newSeats);
    } else {
      const selectedSeat2 = document.getElementById(e.id);
      console.log("new seat", selectedSeat2);

      selectedSeat2.classList.remove("btn-info");
      selectedSeat2.classList.add("btn-success");

      setSelectedSeats([
        ...selectedSeats,
        { row: e.seatRow, col: e.seatCol, id: e.id },
      ]);
    }
  };

  const insertTicket = (e) => {
    const finalSeats = selectedSeats.map((seat) => {
      return { row: seat.row, col: seat.col };
    });

    const un = localStorage.getItem("username");
    console.log("unnnn", un);
    console.log("finalSeats", finalSeats);
    axios
      .post("https://careful-elk-petticoat.cyclic.app/api/tickets/", {
        username: { un },
        matchId: matchID,
        seat: finalSeats,
      })
      .then((res) => {
        console.log("response: ", res);
        setIsSuccess(true);
        setIsFiled(false);
        fetchSeats();
      })
      .catch((err) => {
        console.log("error: ", err);
        setIsSuccess(false);
        setIsFiled(true);
      })();
  };

  const fetchSeats = async () => {
    const r = await axios
      .get(
        `https://careful-elk-petticoat.cyclic.app/api/match/seats/${matchID}`
      )
      .then((res) => {
        console.log(res.data.data.seats);
        setSeats(res.data.data.seats);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    fetchSeats();

    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);

  React.useEffect(() => {
    console.log(time);
  }, [time]);

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  React.useEffect(() => {
    console.log("selectedSeats", selectedSeats);
  }, [selectedSeats]);

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
        <div className="content-center brand" style={{ width: "100%" }}>
          <Container style={{ marginTop: "200px" }}>
            <Row className="justify-content-md-center">
              <Col className="">
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
                      select seats
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form className="form"></Form>
                    <Row className="justify-content-md-center">
                      <Col>
                        {seats.map((r) => {
                          return (
                            <Row
                              style={{
                                marginLeft: "5px",
                                textAlign: "center",
                              }}
                            >
                              {r.map((s) => {
                                return (
                                  <Button
                                    color="info"
                                    size="sm"
                                    disabled={s.isTaken ? true : false}
                                    onClick={() =>
                                      handleSeatClick({
                                        seatRow: s.row,
                                        seatCol: s.col,
                                        id: `${s.row}${s.col}`,
                                      })
                                    }
                                    id={`${s.row}${s.col}`}
                                    style={{
                                      width: "20px",
                                      height: " 20px",
                                      padding: "0",
                                      fontSize: "10px",
                                    }}
                                    seatRow={s.row}
                                    seatCol={s.col}
                                  >
                                    {s.row}
                                    {s.col}
                                  </Button>
                                );
                              })}
                            </Row>
                          );
                        })}

                        {selectedSeats.length == 0 ? (
                          <div
                            style={{ marginTop: "20px", textAlign: "center" }}
                          >
                            <h3>Please select a seat first</h3>
                          </div>
                        ) : (
                          <div
                            style={{ marginTop: "20px", textAlign: "center" }}
                          >
                            <h3
                              style={{ marginBottom: "0", fontWeight: "600" }}
                            >
                              Quantity
                            </h3>
                            <h4>{selectedSeats.length}</h4>

                            <h3
                              style={{ marginBottom: "0", fontWeight: "600" }}
                            >
                              Price
                            </h3>
                            <h4>{selectedSeats.length * 50}</h4>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="btn"
                      color="primary"
                      size="lg"
                      onClick={handleSubmit}
                    >
                      Reserve
                    </Button>
                    {isSuccess ? (
                      <Alert color="success" style={{ marginTop: "20px" }}>
                        Tickets reserved successflly.
                      </Alert>
                    ) : null}
                    {isFailed ? (
                      <Alert color="danger" style={{ marginTop: "20px" }}>
                        Failed reserving tickets.
                      </Alert>
                    ) : null}
                  </CardFooter>
                </Card>
              </Col>
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
                    <h3 className="mb-0">Payment</h3>
                  </div>
                </div>
                <div className="modal-body">
                  <div id="PaymentForm">
                    <Cards
                      cvc={card.cvc}
                      expiry={card.expiry}
                      focused={card.focus}
                      name={card.name}
                      number={card.number}
                    />
                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                      <h3 style={{ marginBottom: "0", fontWeight: "600" }}>
                        Total Payment
                      </h3>
                      <h4>{selectedSeats.length * 50} EGP</h4>
                    </div>
                    <form style={{ marginTop: "20px" }}>
                      <InputGroup
                      // className={classnames({
                      //   "input-group-focus": addressFocus,
                      // })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {/* <i className="fa fa-map-pin"></i>{" "} */}
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="tel"
                          name="number"
                          placeholder="Card Number"
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                        />
                      </InputGroup>
                      <InputGroup
                      // className={classnames({
                      //   "input-group-focus": addressFocus,
                      // })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {/* <i className="fa fa-map-pin"></i>{" "} */}
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Card Name"
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                        />
                      </InputGroup>
                      <InputGroup
                      // className={classnames({
                      //   "input-group-focus": addressFocus,
                      // })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {/* <i className="fa fa-map-pin"></i>{" "} */}
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="number"
                          name="expiry"
                          placeholder="Expiry Date"
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                        />
                      </InputGroup>
                      <InputGroup
                      // className={classnames({
                      //   "input-group-focus": addressFocus,
                      // })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {/* <i className="fa fa-map-pin"></i>{" "} */}
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="tel"
                          name="cvc"
                          placeholder="CVC"
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                        />
                      </InputGroup>
                    </form>
                  </div>
                  {/* <Form className="form">
                      <InputGroup
                        className={classnames({
                          "input-group-focus": creditCardNumber,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="name"
                          placeholder="Credit Card Number"
                          type="number"
                          onFocus={(e) => setCreditCardNumber(true)}
                          onBlur={(e) => setCreditCardNumber(false)}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": creditCardName,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="creditCardName"
                          placeholder="Card holder name"
                          type="text"
                          onFocus={(e) => setCreditCardName(true)}
                          onBlur={(e) => setCreditCardName(false)}
                          onChange={handleChange}
                        />
                      </InputGroup>

                      <InputGroup
                        className={classnames({
                          "input-group-focus": creditCardDate,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="creditCardDate"
                          type="date"
                          onFocus={(e) => setCreditCardDate(true)}
                          onBlur={(e) => setCreditCardDate(false)}
                          onChange={handleChange}
                        />
                  
                      </InputGroup>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": creditCardCVC,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="cvc"
                          placeholder="CVC"
                          type="number"
                          onFocus={(e) => setCreditCardCVC(true)}
                          onBlur={(e) => setCreditCardCVC(false)}
                          onChange={handleChange}
                        />
                      </InputGroup>

                    </Form> */}
                  <Button
                    className="btn"
                    color="primary"
                    size="md"
                    onClick={handleSubmitPay}
                  >
                    Pay
                  </Button>
                </div>
              </Modal>
            </Row>
            <div className="register-bg" />
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}
