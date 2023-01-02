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
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import AddMatchPage from "views/examples/AddMatch";
import AddStadiumPage from "views/examples/AddStadium";
import StadiumsPage from "views/examples/StadiumsPage";
import ReserveMatch from "views/examples/ReserveMatch";
import ReservationsPage from "views/examples/ReservationsPage";
import Profile from "views/examples/ProfileP";
import LoginPage from "views/examples/LoginPage";
import RequestPage from "views/examples/RequestsPage";
import NotFound from "views/examples/NotfoundPage";
import { AuthProvider } from "auth/authProvider";
import UsersPage from "views/examples/UsersPage";
import RegisterManagerPage from "views/examples/RegisterManager";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <Index {...props} />} />
        <Route
          path="/landing-page"
          render={(props) => <LandingPage {...props} />}
        />
        <Route
          path="/register-page"
          render={(props) => <RegisterPage {...props} />}
        />
        <Route
          path="/register-manager"
          render={(props) => <RegisterManagerPage {...props} />}
        />
        <Route
          path="/requests"
          render={(props) => <RequestPage {...props} />}
        />
        <Route path="/users" render={(props) => <UsersPage {...props} />} />
        <Route path="/login" render={(props) => <LoginPage {...props} />} />
        <Route
          path="/profile-page"
          render={(props) => <Profile {...props} />}
        />
        <Route
          path="/add-match-page"
          render={(props) => <AddMatchPage {...props} />}
        />
        <Route
          path="/add-stadium-page"
          render={(props) => <AddStadiumPage {...props} />}
        />
        <Route
          path="/stadiums-page"
          render={(props) => <StadiumsPage {...props} />}
        />
        <Route
          path="/reservation-page"
          render={(props) => <ReserveMatch {...props} />}
        />
        <Route
          path="/reservations"
          render={(props) => <ReservationsPage {...props} />}
        />
      </Switch>
    </BrowserRouter>
  </AuthProvider>
);
