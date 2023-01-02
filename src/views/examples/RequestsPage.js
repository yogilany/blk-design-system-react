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

export default function RequestPage() {
  const [formModal, setFormModal] = React.useState(false);

  const [formData, updateFormData] = React.useState(initialFormData);
  const [formDeleteModal, setFormDeleteModal] = React.useState(false);
  const [formAcceptModal, setFormcceptModal] = React.useState(false);
  const [requests, setRequests] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSuccess2, setIsSuccess2] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);

  const [isFailed, setIsFiled] = React.useState(false);
  const [isFailed2, setIsFiled2] = React.useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleAccept = (e) => {
    // setFormcceptModal(true);
    Acceptrequest(e);

    e.preventDefault();
    console.log(formData);
    // ... submit to API or something
  };

  const handleDeny = (e) => {
    setSelectedUser(e);

    setFormDeleteModal(true);

    e.preventDefault();
    console.log(formData);
    // ... submit to API or something
  };

  const data = React.useMemo(() => [...requests], [requests]);

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
              color="info"
              size="sm"
              onClick={() => handleAccept(original.user_name)}
            >
              Approve
            </Button>
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
            <Button
              color="danger"
              size="sm"
              onClick={() => handleDeny(original.user_name)}
            >
              Reject
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
  const fetchRequests = async () => {
    setIsLoading(true);
    const r = await axios
      .get("https://careful-elk-petticoat.cyclic.app/api/users/pending/")
      .then((res) => {
        console.log(res.data.data);
        setRequests(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Acceptrequest = (e) => {
    console.log("eeettt", e);
    axios
      .patch(
        `https://careful-elk-petticoat.cyclic.app/api/users/managers/confirm/${e}/`
      )
      .then((res) => {
        console.log("response: ", res);
        setIsSuccess(true);
        setIsFiled(false);
        fetchRequests();
      })
      .catch((err) => {
        console.log("error: ", err);
        setIsSuccess(false);
        setIsFiled(true);
      })();
  };

  const Rejectrequest = (e) => {
    console.log("eeettt", e);
    axios
      .patch(
        `https://careful-elk-petticoat.cyclic.app/api/users/managers/deny/${e}/`
      )
      .then((res) => {
        console.log("response: ", res);
        setIsSuccess2(true);
        setIsFiled2(false);
        fetchRequests();
      })
      .catch((err) => {
        console.log("error: ", err);
        setIsSuccess2(false);
        setIsFiled2(true);
      })();
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  React.useEffect(() => {
    fetchRequests();
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
                Requests
              </h1>
            </div>
            {isSuccess ? (
              <Alert color="success" style={{ marginTop: "20px" }}>
                User has been approved successflly.
              </Alert>
            ) : null}
            {isFailed ? (
              <Alert color="danger" style={{ marginTop: "20px" }}>
                Failed approving the user.
              </Alert>
            ) : null}

            {isSuccess2 ? (
              <Alert color="success" style={{ marginTop: "20px" }}>
                User has been rejected successflly.
              </Alert>
            ) : null}
            {isFailed2 ? (
              <Alert color="danger" style={{ marginTop: "20px" }}>
                Failed rejecting the user.
              </Alert>
            ) : null}
            {!isLoading ? (
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
              <h1>Loading</h1>
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
                <h4 className="title title-up">Reject User</h4>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to reject this user?</p>
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
                    Rejectrequest(selectedUser);
                  }}
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
