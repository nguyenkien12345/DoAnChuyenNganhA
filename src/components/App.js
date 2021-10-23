import React from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "../components/ForgotPassword";
import LogIn from "../components/LogIn";
import NotFound from "../components/NotFound";
import SignUp from "../components/SignUp";
import UpdateProfile from "../components/UpdateProfile";
import AuthContextProvider from "../contexts/AuthContextProvider";
import PrivateRoute from "../privateRoute/PrivateRoute";
import Add from "./Add";
import Detail from "./Detail";
import Header from "./Header";
import Home from "./Home";
import Profile from "./Profile";
import Search from "./Search";

function App() {
  return (
    <>
      <Container>
        <Header />
      </Container>
      <Container className="d-flex flex-column align-items-center justify-content-center">
        <div className="w-100 text-center mt-5">
          <AuthContextProvider>
            <ToastContainer position="top-center" />
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={LogIn} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute path="/" exact component={Home} />
              <PrivateRoute path="/add" component={Add} />
              <PrivateRoute path="/details/:id" component={Detail} />
              <PrivateRoute path="/search" component={Search} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </AuthContextProvider>
        </div>
      </Container>
    </>
  );
}

export default App;
