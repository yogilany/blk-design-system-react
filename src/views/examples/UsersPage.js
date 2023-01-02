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
import React, { useEffect, useMemo, useState } from "react";
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
  Spinner,
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

export default function UsersPage() {
  const [users, setUsers] = React.useState([]);

  const [formDeleteModal, setFormDeleteModal] = React.useState(false);
  const [formAcceptModal, setFormcceptModal] = React.useState(false);

  const handleApprove = (e) => {
    setFormcceptModal(true);
    console.log("eeee", e);
  };

  const handleReject = (e) => {
    setFormDeleteModal(true);
    console.log("eeee", e);
  };

  const data = React.useMemo(() => [...users], [users]);

  const columns = React.useMemo(
    () => [
      {
        Cell: (s) => {
          const { original } = s.row;

          return (
            <span style={{ fontWeight: `bold` }}>
              {original.fname} {original.lname}
            </span>
          );
        },
        Header: `Name`,
        id: `name`,
      },
      {
        Header: "Username",
        accessor: "user_name",
      },
      {
        Header: "Email",
        accessor: "lname",
      },

      {
        Cell: (data) => {
          const { row } = data;
          const { original } = row;

          return (
            <Button
              color="danger"
              size="sm"
              onClick={() => handleReject(original)}
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

  const fetchUsers = async () => {
    const r = await axios
      .get("https://world-cup-backend-g3yn.onrender.com/api/users/managers")
      .then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  React.useEffect(() => {
    fetchUsers();

    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  useEffect(() => {
    console.log("users", users);
  }, [users]);
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
                Managers
              </h1>
            </div>
            {users.length !== 0 ? (
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
            ) : (
              <Spinner animation="grow" variant="light" />
            )}

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
                <h4 className="title title-up">Delete User</h4>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this user?</p>
              </div>
              <div className="modal-footer">
                <Button
                  color="default"
                  type="button"
                  onClick={() => setFormDeleteModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  type="button"
                  onClick={() => setFormDeleteModal(false)}
                >
                  Confirm
                </Button>
              </div>
            </Modal>
            <Modal
              isOpen={formAcceptModal}
              toggle={() => setFormcceptModal(false)}
            >
              <div className="modal-header justify-content-center">
                <button
                  className="close"
                  onClick={() => setFormcceptModal(false)}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
                <h4 className="title title-up">Accept User</h4>
              </div>
              <div className="modal-body">
                <p>User is accepted</p>
              </div>
            </Modal>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
