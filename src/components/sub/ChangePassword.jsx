import React, { Component, Fragment } from "react";
import Cookies from "js-cookie";
import "assets/css/dashstyle.css";
import Navbar from "components/sub/NavbarC";
import Axios from "axios";
import SessionExpired from "components/sub/SessionExpired";
import FooterC from "./FooterC";
import show from "assets/icons/eye.svg";
import hide from "assets/icons/eye-slash.svg";
import Toast from "light-toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

toast.configure({ draggable: false, autoClose: 2000 });

const axios = Axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});
const bearer = Cookies.get("token") ? "Bearer " + Cookies.get("token") : null;
const config = { headers: { Authorization: bearer } };

class ChangeaPassword extends Component {
  state = {};
  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    Toast.loading();
    axios
      .post("/changepassword", this.state, config)
      .then((response) => {
        Toast.hide();
        if (response.data.status === 200) {
          toaster.notify(response.data.message, { duration: 1500 });
          this.props.history.push(`/login`);
        } else {
          Toast.hide();
          Toast.fail("", 800);
          toast.error(
            response.data.body ? response.data.body : response.data.message
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showPassword = (id1, id2) => {
    let pass = document.getElementById(id2);

    let button = document.getElementById(id1);
    if (pass.getAttribute("type") === "password") {
      pass.setAttribute("type", "text");
      button.setAttribute("src", show);
    } else {
      pass.setAttribute("type", "password");
      button.setAttribute("src", hide);
    }
  };

  render() {
    if (!Cookies.get("token")) {
      return <SessionExpired></SessionExpired>;
    } else {
      return (
        <Fragment>
          <div className="d-flex" id="wrapper">
            {/* <SidebarC></SidebarC> */}
            <div id="page-content-wrapper">
              <Navbar info={Cookies.getJSON("info")} toggley={true}></Navbar>
              <div className="card bg-light" style={{ marginTop: "15px" }}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <a href="/profile">back</a>
                    <span
                      style={{
                        fontSize: "30px",
                        marginLeft: "340px",
                        fontWeight: "bold",
                      }}
                    >
                      &nbsp;&nbsp;Password
                    </span>
                  </li>
                </ul>
              </div>

              <div className="container-fluid col-9" id="mainarea">
                <div
                  className="card border-color-Secondary"
                  style={{
                    marginLeft: "50px",
                    marginTop: "100px",
                    width: "600px",
                  }}
                >
                  <ul className="list-group ">
                    <li className="list-group-item text-info">
                      Change Password
                    </li>
                    <li className="list-group-item">
                      <div className="form-group">
                        <label htmlFor="oldPassword">Current Password</label>
                        <div className="input-group">
                          <input
                            type="password"
                            className="form-control col-8"
                            id="oldPassword"
                            required={true}
                            minLength="8"
                            onChange={this.handleInputChange}
                            name="oldPassword"
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() =>
                                this.showPassword("eyekon", "oldPassword")
                              }
                            >
                              <img
                                src={hide}
                                alt=""
                                title="Show Password"
                                id="eyekon"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <div className="input-group">
                          <input
                            type="password"
                            className="form-control col-8"
                            id="newPassword"
                            required={true}
                            minLength="8"
                            name="newPassword"
                            onChange={this.handleInputChange}
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() =>
                                this.showPassword("eyekon2", "newPassword")
                              }
                            >
                              <img
                                src={hide}
                                alt=""
                                title="Show Password"
                                id="eyekon2"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <button
                        type="submit"
                        className="btn btn-outline-success"
                        onClick={this.handleSubmit}
                      >
                        Change Password
                      </button>
                    </li>
                  </ul>
                </div>
                <FooterC></FooterC>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

export default ChangeaPassword;
