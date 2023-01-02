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
  Alert,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

import { useTable } from "react-table";
import axios from "axios";

const initialFormData = Object.freeze({
  name: "",
  address: "",
  shape: "",
  seats: "",
});

export default function ReservationsPage() {
  const [formModal, setFormModal] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [nameFocus, setNameFocus] = React.useState(false);
  const [addressFocus, setAddressFocus] = React.useState(false);
  const [shapeFocus, setShapeFocus] = React.useState(false);
  const [seatsFocus, setSeatsFocus] = React.useState(false);
  const [formData, updateFormData] = React.useState(initialFormData);
  const [isLoading, setIsLoading] = React.useState(true);
  const [reservations, setReservations] = React.useState([]);
  const [selectedReservation, setSelectedReservations] = React.useState([]);
  const [isFailed2, setIsFiled2] = React.useState(false);
  const [isSuccess2, setIsSuccess2] = React.useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // ... submit to API or something
  };

  const DeleterReservation = (e) => {
    axios
      .delete(`https://careful-elk-petticoat.cyclic.app/api/tickets/${e}/`)
      .then((res) => {
        console.log("response: ", res);
        setFormModal(false);
        setIsSuccess2(true);
        setIsFiled2(false);

        fetchReservations();
      })
      .catch((err) => {
        setIsSuccess2(false);
        setIsFiled2(true);
        console.log("error: ", err);
      })();
  };
  const data = React.useMemo(() => [...reservations], [reservations]);

  const columns = React.useMemo(
    () => [
      {
        Cell: (s) => {
          const { original } = s.row;

          return (
            <span>
              {original.match_id} {original.lname}
            </span>
          );
        },
        Header: "Match ID",
        accessor: "match",
      },

      {
        Cell: (s) => {
          const { original } = s.row;

          return (
            <span>
              {original.seat_row} {original.seat_col}
            </span>
          );
        },
        Header: "Seat",
        accessor: "seat",
      },

      {
        Cell: (data) => {
          const { row } = data;
          const { original } = row;

          return (
            <Button
              color="danger"
              size="sm"
              onClick={() => {
                setSelectedReservations(original.id);
                setFormModal(true);
              }}
            >
              Delete
            </Button>
          );
        },
        // Header: `Delete`,
        accessor: (data) => ({ id: data.id }),
        id: `delete`,
      },
    ],
    []
  );

  const fetchReservations = async () => {
    setIsLoading(true);
    const userNamee = localStorage.getItem("username");
    console.log("username", userNamee);
    const r = await axios
      .get(`https://careful-elk-petticoat.cyclic.app/api/tickets/Alii/`)
      .then((res) => {
        console.log(res.data.data.tickets);
        setReservations(res.data.data.tickets);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  React.useEffect(() => {
    fetchReservations();
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);
  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
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
                }}
              >
                Reservations
              </h1>
            </div>
            {isSuccess2 ? (
              <Alert color="success" style={{ marginTop: "20px" }}>
                Reservation has been deleted successflly.
              </Alert>
            ) : null}
            {isFailed2 ? (
              <Alert color="danger" style={{ marginTop: "20px" }}>
                Failed deleting the reservation.
              </Alert>
            ) : null}
            <Table {...getTableProps()} responsive>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} className="">
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()} className="">
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Modal isOpen={formModal} toggle={() => setFormModal(false)}>
              <div className="modal-header justify-content-center">
                <button className="close" onClick={() => setFormModal(false)}>
                  <i className="tim-icons icon-simple-remove" />
                </button>
                <h4 className="title title-up">Cancel Reservation</h4>
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
                    DeleterReservation(selectedReservation);

                    setFormModal(false);
                  }}
                >
                  Delete
                </Button>
              </div>
            </Modal>
          </Container>
        </div>

        <Footer />
      </div>
    </>
  );
}
