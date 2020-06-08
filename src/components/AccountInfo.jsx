import React, { Component, Fragment } from "react";
import Cookies from "js-cookie";
import SidebarC from "components/sub/SidebarC";
import Navbar from "components/sub/NavbarC";
import Axios from "axios";
import SessionExpired from "components/sub/SessionExpired";
import Toast from "light-toast";
import "assets/css/dashstyle.css";
import FooterC from "./sub/FooterC";

const axios = Axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});
const bearer = Cookies.get("token") ? "Bearer " + Cookies.get("token") : null;
const config = { headers: { Authorization: bearer } };
class AccountInfo extends Component {
  state = {
    avatar: "",
    ID: "",
    email: "",
    first_name: "",
    last_name: "",
    gender: "",
    phone: "",
    title: "",
    token: Cookies.get("token"),
  };

  getUser() {
    axios
      .get("/user", config)
      .then((response) => {
        Cookies.set("role", response.data.role);
        this.setState({
          title: response.data.title,
          avatar: response.data.avatar,
          role: response.data.role,
          first_name: response.data.first_name,
          ID: response.data.ID,
          email: response.data.email,
          last_name: response.data.last_name,
          sex: response.data.sex,
          phone: response.data.phone,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getUser();
    this.timer = setInterval(() => this.getUser(), 10000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  test = (e) => {
    e.preventDefault();
    const fieldname = e.target.id;
    const x = fieldname + "i";
    const value = document.getElementById(x).value;
    console.log(fieldname);

    const data = {};
    data[fieldname] = value;

    //Send request here

    axios
      .post("/editdetails", data, config)
      .then((response) => {
        if (response.data.status === 200) {
          Toast.success(response.data.message, 1000);
          this.setState(data);
        } else {
          Toast.fail(response.data.body, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (!this.state.token) {
      return <SessionExpired></SessionExpired>;
    } else {
      return (
        <Fragment>
          <div className="d-flex" id="wrapper">
            <SidebarC role={this.state.role}></SidebarC>

            <div id="page-content-wrapper">
              <Navbar
                info={{
                  title: this.state.title,
                  sex: this.state.sex,
                  username: this.state.first_name,
                }}
              ></Navbar>

              <div className="container-fluid col-9" id="mainarea">
                <h1 className="mt-4">Personal Info</h1>
                <p>Basic info, like your name, courses and avatar</p>

                <div
                  className="card"
                  id="pinfocard"
                  style={{ boxShadow: "5px 5px 5px #9e9e9e" }}
                >
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <h3>Account</h3>
                      Cras justo odio
                    </li>

                    {/* Avatar ROW */}
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-2">
                          <label htmlFor="avatari">Avatar</label>
                        </div>
                        <div className="col-5">
                          <div className="input-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="avatari"
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="avatari"
                              >
                                Choose file
                              </label>
                            </div>
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                id="avatar"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    {/* Name Row */}
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-2">
                          <label htmlFor="first_namei">Name</label>
                        </div>

                        {this.state.role === "TUTOR" ? (
                          <div className="col-2">
                            <div className="input-group">
                              <select
                                className="custom-select"
                                id="titlei"
                                aria-label="Example select with button addon"
                              >
                                <option defaultValue>{this.state.title}</option>
                                {this.state.title !== "Mr." ? (
                                  <option value="Mr.">Mr.</option>
                                ) : null}
                                {this.state.title !== "Miss" ? (
                                  <option value="Miss ">Miss</option>
                                ) : null}
                                {this.state.title !== "Mrs." ? (
                                  <option value="Mrs.">Mrs.</option>
                                ) : null}
                                {this.state.title !== "Dr." ? (
                                  <option value="Dr.">Dr.</option>
                                ) : null}
                                {this.state.title !== "Prof." ? (
                                  <option value="Prof.">Prof.</option>
                                ) : null}
                              </select>
                              <div className="input-group-append">
                                <button
                                  id="title"
                                  onClick={this.test}
                                  className="btn btn-outline-secondary"
                                  type="button"
                                >
                                  Edit
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        <div className="col-3">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First Name"
                              id="first_namei"
                              defaultValue={this.state.first_name}
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                id="first_name"
                                onClick={this.test}
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="col-4">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last Name"
                              id="last_namei"
                              defaultValue={this.state.last_name}
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                id="last_name"
                                onClick={this.test}
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    {/* Gender Row */}

                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-2">
                          <label htmlFor="sexi">Gender</label>
                        </div>
                        <div className="col-3">
                          <div className="input-group">
                            <select className="custom-select" id="sexi">
                              <option defaultValue>{this.state.sex}</option>
                              {this.state.sex !== "Male" ? (
                                <option value="Male">Male</option>
                              ) : null}
                              {this.state.sex !== "Female" ? (
                                <option value="Female">Female</option>
                              ) : null}
                              {this.state.sex !== "Other" ? (
                                <option value="Other">Other</option>
                              ) : null}
                              {this.state.sex !== "Neutral" ? (
                                <option value="Neutral">Neutral</option>
                              ) : null}
                            </select>
                            <div className="input-group-append">
                              <button
                                id="sex"
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.test}
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* Password Row */}
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-2">
                          <label htmlFor="password">Password</label>
                        </div>
                        <div className="col-5">
                          <div className="input-group">
                            <input
                              type="password"
                              readOnly={true}
                              className="form-control"
                              value="xxxxxxxxxxxx"
                              id="password"
                            />
                            <div className="input-group-append">
                              <a href="/changepassword">
                                <button
                                  className="btn btn-outline-secondary"
                                  type="button"
                                >
                                  Edit
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-2">
                          <label htmlFor="ID">ID Number</label>
                        </div>
                        <div className="col-2">
                          <div className="input-group">
                            <input
                              type="text"
                              readOnly={true}
                              className="form-control"
                              defaultValue={this.state.ID}
                              id="ID"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">Cras justo odio</li>
                  </ul>
                </div>

                <br></br>
                <br></br>
                <br></br>

                <div
                  className="card"
                  id="contactcard"
                  style={{ boxShadow: "5px 5px 5px #9e9e9e" }}
                >
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <h3>Contact Info</h3>
                      Cras justo odio
                    </li>

                    {/* Phone number Row */}
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-2">
                          <label htmlFor="phonei">Phone</label>
                        </div>

                        <div className="col-6">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">+233</span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              id="phonei"
                              pattern="\d*"
                              minLength="9"
                              maxLength="9"
                              defaultValue={this.state.phone}
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.test}
                                id="phone"
                              >
                                Edit{" "}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* Email Row */}
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-2">
                          <label htmlFor="emaili">Email</label>
                        </div>
                        <div className="col-6">
                          <div className="input-group">
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Mail"
                              id="emaili"
                              defaultValue={this.state.email}
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.test}
                                id="email"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">Vestibulum at eros</li>
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

export default AccountInfo;
