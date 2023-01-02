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
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

import { useTable } from "react-table";

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

  const data = React.useMemo(
    () => [
      {
        match: "Egypt Vs. Spain",
        date: "25 Jan 2023",
      },
      {
        match: "Egypt Vs. Spain",
        date: "25 Jan 2023",
      },
      {
        match: "Egypt Vs. Spain",
        date: "25 Jan 2023",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Match",
        accessor: "match", // accessor is the "key" in the data
      },
      {
        Header: "Date",
        accessor: "date",
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  React.useEffect(() => {
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
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/blob.png")}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path2.png")}
          />
          <img
            alt="..."
            className="shapes triangle"
            src={require("assets/img/triunghiuri.png")}
          />
          <img
            alt="..."
            className="shapes wave"
            src={require("assets/img/waves.png")}
          />
          <img
            alt="..."
            className="shapes squares"
            src={require("assets/img/patrat.png")}
          />
          <img
            alt="..."
            className="shapes circle"
            src={require("assets/img/cercuri.png")}
          />
          <div className="content-center">
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
                  onClick={() => setFormModal(false)}
                >
                  Delete
                </Button>
              </div>
            </Modal>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
