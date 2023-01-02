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

export default function StadiumsPage() {
  const [formModal, setFormModal] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [nameFocus, setNameFocus] = React.useState(false);
  const [addressFocus, setAddressFocus] = React.useState(false);
  const [shapeFocus, setShapeFocus] = React.useState(false);
  const [seatsFocus, setSeatsFocus] = React.useState(false);
  const [formData, updateFormData] = React.useState(initialFormData);
  const [venues, setVenues] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

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

  const data = React.useMemo(() => [...venues], [venues]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Stadium Name",
        accessor: "venue_name", // accessor is the "key" in the data
      },
      {
        Header: "Max number of rows",
        accessor: "maxrow",
      },
      {
        Header: "Max number of columns",
        accessor: "maxcol",
      },
      {
        Cell: (s) => {
          const { original } = s.row;

          return (
            <span style={{ fontWeight: `bold` }}>
              {original.maxrow * original.maxcol}
            </span>
          );
        },
        Header: "Number of Seats",
      },
      // {
      //   Cell: (data) => {
      //     const { row } = data;
      //     const { original } = row;

      //     return (
      //       <Button color="info" size="sm" onClick={() => setFormModal(true)}>
      //         Edit
      //       </Button>
      //     );
      //   },
      //   // Header: `Actions`,
      //   accessor: (data) => ({ id: data.id }),
      //   id: `Details`,
      // },
      // {
      //   Cell: (data) => {
      //     const { row } = data;
      //     const { original } = row;

      //     return (
      //       <Button
      //         color="danger"
      //         size="sm"
      //         onClick={() => {
      //           console.log(original);
      //         }}
      //       >
      //         Delete
      //       </Button>
      //     );
      //   },
      //   // Header: `Delete`,
      //   accessor: (data) => ({ id: data.id }),
      //   id: `delete`,
      // },
    ],
    []
  );

  const fetchVenues = async () => {
    const r = await axios
      .get("https://world-cup-backend-g3yn.onrender.com/api/venue/")
      .then((res) => {
        console.log(res.data.data);
        setVenues(res.data.data.venues);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  React.useEffect(() => {
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
                Stadiums
              </h1>
            </div>
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
              modalClassName="modal-black"
              isOpen={formModal}
              toggle={() => setFormModal(false)}
            >
              <div className="modal-header justify-content-center">
                <button className="close" onClick={() => setFormModal(false)}>
                  <i className="tim-icons icon-simple-remove text-white" />
                </button>
                <div className="text-muted text-center ml-auto mr-auto">
                  <h3 className="mb-0">Edit stadium details</h3>
                </div>
              </div>
              <div className="modal-body">
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
                      name="name"
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
                      name="address"
                      placeholder="Address"
                      type="text"
                      onFocus={(e) => setAddressFocus(true)}
                      onBlur={(e) => setAddressFocus(false)}
                      onChange={handleChange}
                    />
                  </InputGroup>

                  <InputGroup
                    className={classnames({
                      "input-group-focus": shapeFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        {/* <i className="fa fa-square"></i>{" "} */}
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="shape"
                      type="select"
                      onFocus={(e) => setShapeFocus(true)}
                      onBlur={(e) => setShapeFocus(false)}
                      onChange={handleChange}
                    >
                      <option value="" disabled selected>
                        Shape
                      </option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": seatsFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        {/* <i className="fa fa-check-to-slot" /> */}
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="seats"
                      placeholder="Seats number"
                      type="number"
                      onFocus={(e) => setSeatsFocus(true)}
                      onBlur={(e) => setSeatsFocus(false)}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form>
                <Button
                  className="btn-round"
                  color="primary"
                  size="md"
                  onClick={handleSubmit}
                >
                  Save
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
