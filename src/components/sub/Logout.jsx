import React, { Component } from "react";
import Cookies from "js-cookie";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import { Redirect } from "react-router-dom";
class Logout extends Component {
  state = {};

  componentDidMount() {
    Cookies.remove("token");
    Cookies.remove("role");
    toaster.notify("Logged out", { duration: 1000 });
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
