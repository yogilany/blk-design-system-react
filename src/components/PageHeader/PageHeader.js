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

// reactstrap components
import { Container, Col, Row, UncontrolledCarousel } from "reactstrap";

const carouselItems = [
  {
    src: require("assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: "Big City Life, United States",
  },
  {
    src: require("assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States",
  },
  {
    src: require("assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: "Stocks, United States",
  },
];
export default function PageHeader() {
  return (
    <div className="page-header header-filter" id="GFG" style={{}}>
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand" style={{ width: "100%" }}>
          <h1 className="h1-seo" style={{ fontFamily: "Qatar2022Arabic-Bold" }}>
            دوري أبطال بولاق الدكرور{" "}
          </h1>
          {/* <h3 className="h2" style={{ fontFamily: "Qatar2022Arabic-Bold" }}>
            مركز كوم إمبو
          </h3> */}
          <h4 className="d-none d-sm-block" style={{ marginBottom: "50px" }}>
            Welcome to FIFA Bolaaq El Dakrour Champions League 2022!
          </h4>
          <Row>
            <img
              alt="..."
              // className="img-center img-fluid "
              src={require("assets/img/t1.png")}
              width="170px"
              height="260px"
            />
            <img
              alt="..."
              // className="img-center img-fluid "
              src={require("assets/img/t2.png")}
              width="170px"
              height="260px"
            />
            <img
              alt="..."
              className="img-center img-fluid "
              src={require("assets/img/t5.png")}
              width="200px"
            />
            <img
              alt="..."
              // className="img-center img-fluid "
              src={require("assets/img/t3.png")}
              width="170px"
              height="260px"
            />
            <img
              alt="..."
              // className="img-center img-fluid "
              src={require("assets/img/t4.png")}
              width="170px"
              height="260px"
            />
          </Row>
        </div>
      </Container>
    </div>
  );
}
